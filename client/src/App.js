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
import {setContext} from "@apollo/client/link/context";



function App() {

    const {login, logout, token, userId, roles, userName} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    const wsLink = new GraphQLWsLink(createClient({
        url: 'ws://localhost:5000/subscriptions',
    }));

    const httpLink = new HttpLink({
        uri: 'http://localhost:5000/graphql',
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
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
        authLink.concat(httpLink)
    );

    const client = new ApolloClient({
        link: splitLink,
        cache: new InMemoryCache(),
    });

    // if (!ready) {
    //     return <Loader/>
    // }

    return (
        <ApolloProvider client={client}>
            <ToastContainer/>
        <AuthContext.Provider value={{token, userId, login, logout, isAuthenticated, roles, userName}}>
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
