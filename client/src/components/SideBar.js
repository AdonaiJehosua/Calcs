import {NavLink, useLocation} from "react-router-dom";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {useContext} from "react";
import {sideBarContext} from "../context/sideBarContext";
import {Grid} from "@mui/material";


export const SideBar = () => {

    const sideBar = useContext(sideBarContext)

    let location = useLocation()
    let menu = []

    if (location.pathname.includes('/catalogs')) {
        menu = sideBar.catalogs
    }
    if (location.pathname.includes('/calcs')) {
        menu = sideBar.calcs
    }

    return (
        <Grid item xs={2}
              sx={{
                  width: '100%',
                  maxWidth: 360,
                  display: {
                      xs: 'none',
                      md: 'flex'},
                  px: 1,
                  justifyContent: 'center'
              }}
              position={'static'}>
            <nav aria-label="main mailbox folders">
                <List
                sx={{py: 0}}
                >
                    {menu.map((link) => {
                        return (
                            <ListItem disablePadding key={link.pathName}>
                                <ListItemButton component={NavLink} to={`${link.rootName}/${link.pathName}`}>
                                    <ListItemText primary={link.visibleName}/>
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </nav>
        </Grid>
    )
}