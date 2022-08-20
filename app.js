const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const {createServer} = require('http')
const {ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault} = require('apollo-server-core');
const {ApolloServer} = require('apollo-server-express')
const {WebSocketServer} = require('ws')
const {useServer} = require('graphql-ws/lib/use/ws')
const {schema} = require('./graphQLSchema/schema')
const auth = require('./middleware/auth.middleware')

const app = express()
app.use(auth)
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
    // context: async ({req}) => ({
    //     isAuth: await auth(req)
    // }),
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

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
        })
        await server.start()
        server.applyMiddleware({ app })
        httpServer.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()