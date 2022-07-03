import {NavLink, useLocation} from "react-router-dom";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';


const sideBar = {
    catalogs: [
        {
            rootName: 'catalogs',
            pathName: 'formats',
            visibleName: 'Форматы'
        },
        {
            rootName: 'catalogs',
            pathName: 'units',
            visibleName: 'Единицы измерения'
        },
        {
            rootName: 'catalogs',
            pathName: 'chromaticity',
            visibleName: 'Цветность'
        }
    ],
    calcs: [
        {
            rootName: 'calcs',
            pathName: 'amountofpapper',
            visibleName: 'Количество бумаги'
        },
        {
            rootName: 'calcs',
            pathName: 'rollmaterials',
            visibleName: 'Рулонные материалы'
        }
    ]
}


export const SideBar = () => {

    let location = useLocation()
    let menu = []

    if (location.pathname.includes('/catalogs')) {
        menu = sideBar.catalogs
    }
    if (location.pathname.includes('/calcs')) {
        menu = sideBar.calcs
    }

    return (
        <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: {xs: 'none', md: 'flex'}}}>
            <nav aria-label="main mailbox folders">
                <List>
                    {menu.map((link) => {
                        return (
                            <ListItem disablePadding>
                                <ListItemButton component={NavLink} to={`${link.rootName}/${link.pathName}`}>
                                    <ListItemText primary={link.visibleName}/>
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </nav>
        </Box>
    )
}