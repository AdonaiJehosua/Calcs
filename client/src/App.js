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


function App() {

    const {login, logout, token, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    const client = new ApolloClient({
        uri: 'http://192.168.0.5:5000/graphql',
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
