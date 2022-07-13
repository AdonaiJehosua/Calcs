import './App.css';
import 'materialize-css'
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


function App() {

    const {login, logout, token, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <Loader/>
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
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
        </>
    )
}

export default App;
