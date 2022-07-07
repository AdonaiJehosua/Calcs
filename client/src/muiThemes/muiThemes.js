import {createTheme} from "@mui/material";

export const mainColorsTheme = createTheme({
    palette: {
        primary: {
            light: '#fddf5d',
            main: '#fdd835',
            dark: '#b19725',
            contrastText: '#000',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44356',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
})