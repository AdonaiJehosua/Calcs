const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const {graphqlHTTP} = require('express-graphql')
// const schema = require('./graphQLSchema/schema')
const cors = require('cors')
const {createServer} = require('http')
const {ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault} = require('apollo-server-core');
const {ApolloServer} = require('apollo-server-express')
const {WebSocketServer} = require('ws')
const {useServer} = require('graphql-ws/lib/use/ws')
const {schema} = require('./graphQLSchema/schema')

const app = express()
const httpServer = createServer(app)
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});
const serverCleanup = useServer({ schema }, wsServer);


const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ]
})


// app.use(cors())

// app.use(express.json({extended: true}))

// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true
// }))





app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/format', require('./routes/catalogs/format.routes'))
app.use('/api/unit', require('./routes/catalogs/unit.routes'))
app.use('/api/chromaticity', require('./routes/catalogs/chromaticity.routes'))
app.use('/api/calcs', require('./routes/calcs/amountOfPaper.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
        })
        // app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
        await server.start()
        server.applyMiddleware({ app })
        httpServer.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()