const {GraphQLScalarType, Kind, print} = require("graphql");
const Format = require('../models/Format')
const Unit = require('../models/Unit')
const Chromaticity = require('../models/Chromaticity')
const {gql} = require('apollo-server')
const {makeExecutableSchema} = require('graphql-tools')
const {PubSub} = require('graphql-subscriptions')

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

const graphQLIntOrString = new GraphQLScalarType({
    name: 'IntOrString',
    description: 'Type for string or int value',
    serialize: identity,
    parseValue: identity,
    parseLiteral: (ast) => parseLiteral('IntOrString', ast)
})


const pubsub = new PubSub()
const typeDefs = gql`
    scalar IntOrString

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
    
    enum FormatKeys {
        formatName
        longSide
        shortSide
    }
       
    type Unit {
        id: ID
        fullName: String
        abbreviatedName: String 
    }
    
    type Query {
        formats: [Format]
        format(id: ID): Format
        chromaticities: [Chromaticity]
        chromaticity(id: ID!): Chromaticity
        units: [Unit]
        unit(id: ID!): Unit
    }
    
    type Mutation {
        addFormat(formatName: String!, dimensions: DimensionsInput!): String
        updateFormat(id: ID!, entryKey: FormatKeys!, updatingValue: IntOrString!): String
        deleteFormat(id: ID!): String
        addChromaticity(front: Int!, back: Int!): String
        deleteChromaticity(id: ID!): String
        addUnit(fullName: String!, abbreviatedName: String!): String
        deleteUnit(id: ID!): String
    }
    
    type Subscription {
        unitAdded: Unit!
    }
`



//
const resolvers = {
    Query: {
        formats: async () => await Format.find(),
        format: async (parent, args) => await Format.findById(args.id),
        chromaticities: async () => await Chromaticity.find(),
        chromaticity: async (parent, args) => await Chromaticity.findById(args.id),
        units: async () => await Unit.find(),
        unit: async (parent, args) => await Unit.findById(args.id)
    },
    Mutation: {
        addFormat: async (parent, {formatName, dimensions}) => {
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
            await format.save()
            return 'Формат создан.'
        },
        deleteFormat: async (parent, {id}) => {
            await Format.findByIdAndRemove(id)
            return 'Формат удален.'
        },
        updateFormat: async (parent, {id, entryKey, updatingValue}) => {

        },
        addUnit: async (parent, {fullName, abbreviatedName}) => {
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
        }
    },
    IntOrString: graphQLIntOrString,
    Subscription: {
        unitAdded: {
            subscribe: () => pubsub.asyncIterator('UNIT_ADDED')
        }
    }
}

module.exports.schema = new makeExecutableSchema({typeDefs, resolvers})
