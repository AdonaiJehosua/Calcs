const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType
} = require("graphql");
const Movie = require('../models/Movie')
const Director = require('../models/Director')
const Format = require('../models/Format')
const {response} = require("express");

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

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    })
})

const FormatType = new GraphQLObjectType({
    name: 'Format',
    fields: () => ({
        id: {type: GraphQLID},
        formatName: {type: GraphQLString},
        dimensions: {type: DimensionsType},
        area: {type: GraphQLInt}
    })
})

const FormatInputType = new GraphQLInputObjectType({
    name: 'InputFormat',
    fields: () => ({
        id: {type: GraphQLID},
        formatName: {type: GraphQLString},
        dimensions: {type: DimensionsInputType},
        area: {type: GraphQLInt}
    })
})

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorType,
            resolve(parent) {
                return Director.findById(parent.directorId)
            }
        }
    })
})

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent) {
                return Movie.find({directorId: parent.id})
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parent, args) {

            }
        },
        addFormat: {
            type: GraphQLString,
            args: {
                formatName: {type: GraphQLString},
                dimensions: {type: DimensionsInputType}
            },
            async resolve(parent, {formatName, dimensions}) {
                if (!formatName) {
                    throw new Error('Введите имя.')
                }
                if (!dimensions.longSide) {
                    throw new Error('Введите значение длинной стороны.')
                }
                if (!dimensions.shortSide) {
                    throw new Error('Введите значение короткой стороны.')
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
                await format.save()
                return (
                    'Формат создан.'
                )

            }
        },
        deleteFormat: {
            type: FormatType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, {id}) {
                return Format.findByIdAndRemove(id)
            }
        },
        addDirector: {
            type: DirectorType,
            args: {
                name: {type: GraphQLString},

                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                const director = new Director({
                    name: args.name,
                    age: args.age
                })
                return director.save()
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                directorId: {type: GraphQLID}
            },
            resolve(parent, args) {
                const movie = new Movie({
                    name: args.name,
                    genre: args.genre,
                    directorId: args.directorId
                })
                return movie.save()
            }
        },
        deleteDirector: {
            type: DirectorType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Director.findByIdAndRemove(args.id)
            }
        },
        deleteMovie: {
            type: MovieType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Movie.findByIdAndRemove(args.id)
            }
        },
        updateDirector: {
            type: DirectorType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                return Director.findByIdAndUpdate(
                    args.id,
                    {$set: {name: args.name, age: args.age}},
                    {new: true}
                )
            }
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                genre: {type: GraphQLInt},
                directorId: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Movie.findByIdAndUpdate(
                    args.id,
                    {$set: {name: args.name, genre: args.genre, directorId: args.directorId}},
                    {new: true}
                )
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
            resolve(parent, args) {
                return Format.findById(args.id)
            }
        },
        formats: {
            type: new GraphQLList(FormatType),
            resolve(parent, args) {
                return Format.find()
            }
        },
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Movie.findById(args.id)
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Director.findById(args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movie.find()
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return Director.find()
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