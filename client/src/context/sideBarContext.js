import {createContext} from "react";

export const sideBarContext = createContext({
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
})