import {NavLink, useLocation} from "react-router-dom";

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


export const SideBar = ({hidden = true}) => {

    const hiddens = hidden && 'hide-on-med-and-down'
    let location = useLocation()
    let menu = []

    if (location.pathname.includes('/catalogs')) {menu = sideBar.catalogs}
    if (location.pathname.includes('/calcs')) {menu = sideBar.calcs}

    return (
        <div className={`blue darken-1 col s2 white-text center-align ${hiddens}`}>
            <ul>
                {menu.map((link) => {
                    return (
                        <li key={link.pathName}><NavLink className={'white-text'}
                                                         to={`${link.rootName}/${link.pathName}`}>{link.visibleName}</NavLink></li>
                    )
                })}
            </ul>
        </div>
    )
}