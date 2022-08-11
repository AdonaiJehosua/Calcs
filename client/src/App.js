import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import {Navbar} from "./components/NavBar";
import {Loader} from "./components/Loader";
import {useRoutes} from "./structure/routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext"
import {ThemeProvider} from "@emotion/react";
import {mainColorsTheme} from "./muiThemes/muiThemes";
import Box from "@mui/material/Box";
import {ToastContainer} from "react-toastify";
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';


function App() {

    const {login, logout, token, userId, ready} = useAuth()
    const isAuthenticated = true
    const routes = useRoutes(isAuthenticated)

    const wsLink = new GraphQLWsLink(createClient({
        url: 'ws://192.168.0.5:5000/subscriptions',
    }));

    const httpLink = new HttpLink({
        uri: 'http://192.168.0.5:5000/graphql'
    });

    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    );

    const client = new ApolloClient({
        link: splitLink,
        cache: new InMemoryCache(),
    });

    if (!ready) {
        return <Loader/>
    }

    return (
        <ApolloProvider client={client}>
            <ToastContainer/>
        <AuthContext.Provider value={{token, userId, logout, login, isAuthenticated}}>
            <Router>
                <ThemeProvider theme={mainColorsTheme}>
                        {isAuthenticated && <Navbar/>}
                        <Box>
                            {routes}
                        </Box>
                </ThemeProvider>
            </Router>
        </AuthContext.Provider>
        </ApolloProvider>
    )
}

export default App;
