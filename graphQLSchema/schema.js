const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType
} = require("graphql");
const Format = require('../models/Format')
const Unit = require('../models/Unit')
const Chromaticity = require('../models/Chromaticity')
const {response} = require("express");
const {ApolloServer, gql} = require('apollo-server')

const typeDefs = gql`
    type Chromaticity {
        name: String
        front: Number
        back: Number
        isOnePrintSide: Boolean
    }
    
    type Query {
        chromaticities: [Chromaticity]
    }
`

const resolvers = {
    Query: {
        chromaticities: () => {Chromaticity.find()}
    }
}

const FormatType = new GraphQLObjectType({
    name: 'Format',
    fields: () => ({
        id: {type: GraphQLID},
        formatName: {type: GraphQLString},
        dimensions: {type: DimensionsType},
        area: {type: GraphQLInt}
    })
})

const DimensionsType = new GraphQLObjectType({
    name: 'Dimensions',
    fields: () => ({
        longSide: {type: GraphQLInt},
        shortSide: {type: GraphQLInt}
    })
})
const DimensionsInputType = new GraphQLInputObjectType({
    name: 'InputDimensions',
    fields: () => ({
        longSide: {type: GraphQLInt},
        shortSide: {type: GraphQLInt}
    })
})

const UnitType = new GraphQLObjectType({
    name: 'Unit',
    fields: () => ({
        id: {type: GraphQLID},
        fullName: {type: GraphQLString},
        abbreviatedName: {type: GraphQLString},
    })
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addFormat: {
            type: GraphQLString,
            args: {
                formatName: {type: GraphQLString},
                dimensions: {type: DimensionsInputType}
            },
            async resolve(parent, {formatName, dimensions}) {

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
                return (
                    'Формат создан.'
                )
            }
        },
        deleteFormat: {
            type: GraphQLString,
            args: {
                id: {type: GraphQLID}
            },
            async resolve(parent, {id}) {
                await Format.findByIdAndRemove(id)
                return 'Формат удален'
            }
        },
        addUnit: {
            type: GraphQLString,
            args: {
                fullName: {type: GraphQLString},
                abbreviatedName: {type: GraphQLString}
            },
            async resolve(parent, {fullName, abbreviatedName}) {
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
                return 'Единица измерения создана'
            }
        },
        deleteUnit: {
            type: GraphQLString,
            args: {
                id: {type: GraphQLID}
            },
            async resolve(parent, {id}) {
                await Unit.findByIdAndRemove(id)
                return 'Единица измерения удалена'
            }
        },
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        format: {
            type: FormatType,
            args: {id: {type: GraphQLID}},
            resolve(parent, {id}) {
                return Format.findById(id)
            }
        },
        formats: {
            type: new GraphQLList(FormatType),
            resolve() {
                return Format.find()
            }
        },
        unit: {
            type: UnitType,
            args: {id: {type: GraphQLID}},
            resolve (parent, {id}) {
                return Unit.findById(id)
            }
        },
        units: {
            type: new GraphQLList(UnitType),
            resolve () {
                return Unit.find()
            }
        }
    }
})

const Subscription = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        formatAdded: {
            type: FormatType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Format.findById(args.id)
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
    subscription: Subscription
})