import {NavLink, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import AppBar from '@mui/material/AppBar';
import {Box, Toolbar, IconButton, Typography, Menu, Button, Tooltip, MenuItem} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { useSubscription } from "@apollo/client";
import { UNIT_SUBSCRIPTION } from "../graphQL/subscriptions/unitSubscriptions";
import { toast } from "react-toastify";


export const Navbar = () => {

    let navigate = useNavigate()
    const auth = useContext(AuthContext)

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    const {data: subData, loading: subLoading} = useSubscription(UNIT_SUBSCRIPTION)


    useEffect(() => {
        if (!subLoading && subData) {
            toast(`New unit! ${subData.id}`)
        }
    }, [subData, subLoading])

    return (
            <AppBar position='static' sx={{px: 2}}>
                    <Toolbar disableGutters>
                        <AdbIcon sx={{display: {xs: 'none', md: 'flex'}}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            iCALC
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Button component={NavLink} to={'/calcs'}>Калькуляторы</Button>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Button component={NavLink} to={'/catalogs'}>Справочники</Button>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Button component={NavLink} to={'/test'}>Тест</Button>
                                </MenuItem>
                            </Menu>

                        </Box>
                        <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            iCALC
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <Button
                                component={NavLink}
                                to={'/orders'}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                Заказы
                            </Button>
                            <Button
                                component={NavLink}
                                to={'/calcs'}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                Калькуляторы
                            </Button>
                            <Button
                                component={NavLink}
                                to={'/catalogs'}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                Справочники
                            </Button>
                            <Button
                                component={NavLink}
                                to={'/test'}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                Тест
                            </Button>
                        </Box>
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Выйти">
                                <Button onClick={logoutHandler}
                                        sx={{p: 0, my: 2, color: 'white', display: 'block'}}>
                                    Выйти
                                </Button>
                            </Tooltip>
                        </Box>
                    </Toolbar>
            </AppBar>
    )
}