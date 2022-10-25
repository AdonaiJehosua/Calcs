const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const {createServer} = require('http')
const {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');
const {ApolloServer} = require('apollo-server-express')
const {WebSocketServer} = require('ws')
const {useServer} = require('graphql-ws/lib/use/ws')
const {schema} = require('./graphQLSchema/schema')

const jwt = require('jsonwebtoken')
const User = require('./models/User')


const app = express()

const httpServer = createServer(app)
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});
const serverCleanup = useServer({schema}, wsServer);

const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    context: async ({req}) => {
        try {
            const token = req.headers.authorization.split(' ')[1] || ''
            const decodedToken = jwt.verify(token, config.get('jwtSecret'))
            const user = await User.findById(decodedToken.userId).exec()
            return {user}
        } catch (e) {}
    },
    plugins: [
        ApolloServerPluginDrainHttpServer({httpServer}),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
        ApolloServerPluginLandingPageLocalDefault({embed: true}),
    ]
})

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {})
        await server.start()
        server.applyMiddleware({app})
        httpServer.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()