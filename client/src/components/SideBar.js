import {NavLink, useLocation} from "react-router-dom";
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
                  bgcolor: "#fdd835",
                  display: {
                      xs: 'none',
                      md: 'flex'},

                  justifyContent: 'left',
              }}
              position={'static'}>
                <List
                sx={{py: 0, bgcolor: "#fdd835"}}
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
        </Grid>
    )
}