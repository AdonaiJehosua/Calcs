const {GraphQLScalarType, Kind, print, GraphQLError} = require("graphql");
const Format = require('../models/Format')
const Unit = require('../models/Unit')
const User = require('../models/User')
const Chromaticity = require('../models/Chromaticity')
const {gql} = require('apollo-server')
const {makeExecutableSchema} = require('graphql-tools')
const {PubSub} = require('graphql-subscriptions')
const {isNumeric} = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const config = require("config");
const {AuthenticationError} = require("apollo-server-core");
const Order = require("../models/Order");
const ProductionType = require("../models/ProductionType");

function identity(value) {
    return value;
}

function parseLiteral(typeName, ast) {
    switch (ast.kind) {
        case Kind.INT:
        case Kind.STRING:
            return ast.value;
        default:
            throw new TypeError(`${typeName} cannot represent value: ${print(ast)}`);
    }
}

function parseValue(typeName, value) {
    if (typeof value === "number" || typeof value === "string") {
        return value
    } else throw new GraphQLError(`${typeName} cannot represent value: ${value}`)
}

const graphQLIntOrString = new GraphQLScalarType({
    name: 'IntOrString',
    description: 'Type for string or int value',
    serialize: identity,
    parseValue: value => parseValue('IntOrString', value),
    parseLiteral: (ast) => parseLiteral('IntOrString', ast)
})

const graphQLDate = new GraphQLScalarType({
        name: 'CustomDate',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value) // value from the client
        },
        serialize(value) {
            // return value // value sent to the client
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10) // ast value is always in string format
            }
            return null
        },
    })



const pubsub = new PubSub()
const typeDefs = gql`
    scalar IntOrString
    scalar CustomDate
    
    enum UserRoles {
        admin
        prepress
        press
        postpress
        manager
        guest
    }
    
    type User {
        id: ID
        userName: String
        password: String
        roles: UserRoles
        email: String
        phone: String
    }

    type Chromaticity {
        id: ID
        name: String
        front: Int
        back: Int
        isOnePrintSide: Boolean
    }
    
    type Dimensions {
        longSide: Int
        shortSide: Int
    }
    
    input DimensionsInput {
        longSide: Int!
        shortSide: Int!
    }
    
    
    type Format {
        id: ID
        formatName: String
        dimensions: Dimensions
        area: Int
    }

    type ProductionType {
        id: ID
        productionType: String
        description: String
    }

    type UserData {
        id: ID
        userName: String
        roles: UserRoles
        token: String
    }
    

    type Order {
        id: ID
        number1c: Int
        status: String
        description: String
        productionType: ProductionType
        startDate: CustomDate
        finishDate: CustomDate
        creator: UserData
    }

    input ProductionTypeInput {
        id: ID
        productionType: String
        description: String
    }

    enum ProductionTypesKeys {
        productionType
        description
    }
    
    enum FormatKeys {
        formatName
        longSide
        shortSide
    }

    enum OrderStatus {
        prepress
        press
        postpress
        complited
    }
    
    enum UnitKeys {
        fullName
        abbreviatedName
    }
       
    type Unit {
        id: ID
        fullName: String
        abbreviatedName: String 
    }
    
    type Query {
        formats: [Format]
        format(id: ID!): Format
        chromaticities: [Chromaticity]
        chromaticity(id: ID!): Chromaticity
        units: [Unit]
        unit(id: ID!): Unit
        productionTypes: [ProductionType]
        productionType(id: ID): ProductionType
        orders: [Order]
        ordersWithStatus(status: OrderStatus!): [Order]
        order(id: ID!): Order
    }
    
    type Mutation {
        addUser(userName: String!, password: String!, roles: UserRoles!): String
        login(userName: String!, password: String!): UserData
        addOrder(number1c: Int!, status: String!, description: String!, productionType: String!, finishDate: CustomDate!): String
        addFormat(formatName: String!, dimensions: DimensionsInput!): String
        updateFormat(id: ID!, entryKey: FormatKeys!, updatingValue: IntOrString!): String
        deleteFormat(id: ID!): String
        addProductionType(productionType: String!, description: String!): String
        updateProductionType(id: ID!, entryKey: ProductionTypesKeys!, updatingValue: String!): String
        deleteProductionType(id: ID!): String
        addChromaticity(front: Int!, back: Int!): String
        deleteChromaticity(id: ID!): String
        addUnit(fullName: String!, abbreviatedName: String!): String
        deleteUnit(id: ID!): String
        updateUnit(id: ID!, entryKey: UnitKeys!, updatingValue: String!): String
        updateOrderStatus(id: ID!, status: OrderStatus!): String
    }
    
    type Subscription {
        unitAdded: Unit!
    }
`

const resolvers = {
    Query: {
        formats: async () => await Format.find(),
        format: async (parent, args) => await Format.findById(args.id),
        chromaticities: async () => await Chromaticity.find(),
        chromaticity: async (parent, args) => await Chromaticity.findById(args.id),
        units: async () => await Unit.find(),
        unit: async (parent, args) => await Unit.findById(args.id),
        productionTypes: async () => await ProductionType.find(),
        productionType: async (parent, args) => await ProductionType.findById(args.id),
        orders: async () => await Order.find(),
        ordersWithStatus: async (parent, args) => await Order.find({status: args.status}),
        order: async (parent, args) => await Order.findById(args.id),
    },
    Mutation: {
        addUser: async (_, {userName, password, roles}) => {
            const examUserName = await User.findOne({userName})
            if (examUserName) {
                throw new GraphQLError('Такой пользователь уже существует.')
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = await new User({userName: userName, 
                                            password: hashedPassword, 
                                            roles: roles,
                                            email: null,
                                            phone: null
                                            })
            await user.save()
            return 'Пользователь создан.'
        },
        login: async (parent, {userName, password}) => {
            const user = await User.findOne({userName})
            if (!user) {
                throw new Error('Такого пользователя не существует.')
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                throw new Error('Неверный пароль.')
            }
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {algorithm: "HS256", subject: user.id, expiresIn: '1h'}
            )
            return {id: user.id, userName: user.userName, token, roles: user.roles}
        },
        addOrder: async (parent, {number1c, status, description, productionType, finishDate}, context) => {
            // if (!context.user) {
            //     throw new AuthenticationError('Нет авторизации.')
            // }
            console.log(context.id)

            const examNumber1c = await Order.findOne({number1c})
            if (examNumber1c) {
                throw new Error('Заказ с таким номером уже в работе.')
            }

            const order = await new Order({
                number1c: number1c,
                status: status,
                description: description,
                productionType: productionType,
                finishDate: finishDate,
                creator: context.user.id
            })

            console.log(context.id)

            await order.save()
            return 'Заказ создан.'
        },
        updateOrderStatus: async (parent, {id, status}, context) => {
            // if (!context.user) {
            //     throw new AuthenticationError('Нет авторизации.')
            // }
            await Order.findByIdAndUpdate(id, {$set: {status: status}})
            return 'Статус изменен'
        },
        addFormat: async (parent, {formatName, dimensions}, context) => {
            if (!context.user) {
                throw new AuthenticationError('Нет авторизации.')
            }

            const examinationName = await Format.findOne({formatName})
            const examinationDim = await Format.findOne({dimensions})
            if (examinationName) {
                throw new Error('Формат с таким названием существует.')
            }
            if (examinationDim) {
                throw new Error(`Формат с такими значениями существует  - "${examinationDim.formatName}".`)
            }
            const area = dimensions.longSide * dimensions.shortSide
            const format = await new Format({
                formatName: formatName,
                dimensions: {
                    longSide: dimensions.longSide,
                    shortSide: dimensions.shortSide
                },
                area: area
            })
            console.log(context.user.id)
            await format.save()
            return 'Формат создан.'
        },
        deleteFormat: async (parent, {id}, context) => {
            if (!context.user) return null
            await Format.findByIdAndRemove(id)
            return 'Формат удален.'
        },
        updateFormat: async (parent, {id, entryKey, updatingValue}, req) => {
            // if (!req.isAuth) {
            //     throw new AuthenticationError('Нет авторизации.')
            // }
            switch (entryKey) {
                case 'formatName':
                    const examName = await Format.findOne({formatName: updatingValue})
                    if (examName) {
                        throw new GraphQLError(`Формат с таким названием существует: ${updatingValue}.`)
                    }
                    await Format.findByIdAndUpdate(id, {$set: {formatName: updatingValue}})
                    return 'Название формата изменено.'

                case 'longSide':
                    if (!isNumeric(String(updatingValue))) {
                        throw new GraphQLError('Значение длинной стороны должно быть целым числом')
                    }
                    const oldFormatLS = await Format.findById(id)
                    const newDimensionsLS = {longSide: updatingValue, shortSide: oldFormatLS.dimensions.shortSide}
                    const examLongSide = await Format.findOne({dimensions: newDimensionsLS})
                    if (examLongSide) {
                        throw new GraphQLError(`Формат с такими значениями существует: ${oldFormatLS.formatName}.`)
                    }
                    const newAreaLS = newDimensionsLS.longSide * newDimensionsLS.shortSide
                    await Format.findByIdAndUpdate(id, {$set: {dimensions: newDimensionsLS, area: newAreaLS}})
                    return 'Значение длинной стороны изменено.'

                case 'shortSide':
                    if (!isNumeric(String(updatingValue))) {
                        throw new GraphQLError('Значение короткой стороны должно быть целым числом')
                    }
                    const oldFormatSS = await Format.findById(id)
                    const newDimensionsSS = {longSide: oldFormatSS.dimensions.longSide, shortSide: updatingValue}
                    const examShortSide = await Format.findOne({dimensions: newDimensionsSS})
                    if (examShortSide) {
                        throw new GraphQLError(`Формат с такими значениями существует: ${oldFormatSS.formatName}.`)
                    }
                    const newAreaSS = newDimensionsSS.longSide * newDimensionsSS.shortSide
                    await Format.findByIdAndUpdate(id, {$set: {dimensions: newDimensionsSS, area: newAreaSS}})
                    return 'Значение короткой стороны изменено.'
                default:
                    throw new GraphQLError('Что-то пошло не так.')
            }
        },
        addUnit: async (parent, {fullName, abbreviatedName}, context) => {
            if (!context.user) {
                throw new AuthenticationError('Нет авторизации.')
            }

            const examinationFullName = await Unit.findOne({fullName})
            const examinationAbbName = await Unit.findOne({abbreviatedName})

            if (examinationFullName) {
                throw new Error('Единица измерения с таким названием существует.')
            }
            if (examinationAbbName) {
                throw new Error('Единица измерения с таким сокращенным названием существует.')
            }

            const unit = await new Unit({
                fullName: fullName,
                abbreviatedName: abbreviatedName
            })
            await unit.save()
            const newUnit = await Unit.findOne({fullName: fullName})
            await pubsub.publish('UNIT_ADDED', {
                unitAdded: newUnit
            })
            return 'Единица измерения создана.'
        },
        deleteUnit: async (parent, {id}) => {
            await Unit.findByIdAndRemove(id)
            return 'Единица измерения удалена'
        },
        updateUnit: async (parent, {id, entryKey, updatingValue}, req) => {
            // if (!req.isAuth) {
            //     throw new AuthenticationError('Нет авторизации.')
            // }
            switch (entryKey) {
                case 'fullName':
                    const examFullName = await Unit.findOne({fullName: updatingValue})
                    if (examFullName) {
                        throw new GraphQLError(`Единица измерения с таким названием существует: ${updatingValue}.`)
                    }
                    await Unit.findByIdAndUpdate(id, {$set: {fullName: updatingValue}})
                    return 'Полное название изменено.'
                case 'abbreviatedName':
                    const examAbbName = await Unit.findOne({abbreviatedName: updatingValue})
                    if (examAbbName) {
                        throw new GraphQLError(`Единица измерения с таким названием существует: ${updatingValue}.`)
                    }
                    await Unit.findByIdAndUpdate(id, {$set: {abbreviatedName: updatingValue}})
                    return 'Сокращенное название изменено.'

                default:
                    throw new GraphQLError('Что-то пошло не так.')
            }
        },
        addChromaticity: async (parent, {front, back}) => {
            const name = `${front} + ${back}`
            const examinationChromaticity = await Chromaticity.findOne({name})
            if (examinationChromaticity) {
                throw new Error('Такая цветность существует.')
            }
            const isOnePrintSide = Boolean(back === 0)
            const chromaticity = await new Chromaticity({name, front, back, isOnePrintSide})
            await chromaticity.save()
            return 'Цветность создана.'
        },
        deleteChromaticity: async (parent, {id}) => {
            await Chromaticity.findByIdAndRemove(id)
            return 'Цветность удалена.'
        },
        addProductionType: async (parent, {productionType, description}, context) => {
            // if (!context.user) {
            //     throw new AuthenticationError('Нет авторизации.')
            // }

            const examinationProductionType = await ProductionType.findOne({productionType})
            if (examinationProductionType) {
                throw new Error('Такой тип изделия существует.')
            }
            
            const prodType = await new ProductionType({
                productionType: productionType,
                description: description
            })
            await prodType.save()
            return 'Тип изделия создан.'
        },
        updateProductionType: async (parent, {id, entryKey, updatingValue}, req) => {
            // if (!req.isAuth) {
            //     throw new AuthenticationError('Нет авторизации.')
            // }
            switch (entryKey) {
                case 'productionType':
                    const examProductionType = await ProductionType.findOne({productionType: updatingValue})
                    if (examProductionType) {
                        throw new GraphQLError(`Такой тип изделия существует: ${updatingValue}.`)
                    }
                    await ProductionType.findByIdAndUpdate(id, {$set: {productionType: updatingValue}})
                    return 'Название изменено.'
                case 'description':
                    const examDescription = await ProductionType.findOne({description: updatingValue})
                    if (examDescription) {
                        throw new GraphQLError(`Такое описание типа изделия существует: ${updatingValue}.`)
                    }
                    await ProductionType.findByIdAndUpdate(id, {$set: {description: updatingValue}})
                    return 'Описание изменено.'

                default:
                    throw new GraphQLError('Что-то пошло не так.')
            }
        },
        deleteProductionType: async (parent, {id}) => {
            await ProductionType.findByIdAndRemove(id)
            return 'Тип изделия удален.'
        },
    },
    IntOrString: graphQLIntOrString,
    CustomDate: graphQLDate,
    Subscription: {
        unitAdded: {
            subscribe: () => pubsub.asyncIterator('UNIT_ADDED')
        }
    }
}

module.exports.schema = new makeExecutableSchema({typeDefs, resolvers})
