import {createContext} from "react";

export const sideBarContext = createContext({
    orders: [
        {
            rootName: 'orders',
            pathName: 'all',
            visibleName: 'Все'
        },
        {
            rootName: 'orders',
            pathName: 'prepress',
            visibleName: 'Препресс'
        },
        {
            rootName: 'orders',
            pathName: 'press',
            visibleName: 'Пресс'
        },
        {
            rootName: 'orders',
            pathName: 'postpress',
            visibleName: 'Постпресс'
        },
        {
            rootName: 'orders',
            pathName: 'complited',
            visibleName: 'Завершенные'
        },
        
    ],
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
        },
        {
            rootName: 'catalogs',
            pathName: 'productionTypes',
            visibleName: 'Виды продукции'
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