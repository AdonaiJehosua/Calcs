import {styled} from "@mui/material/styles";
import Switch from "@mui/material/Switch";

export const StyledSwitchComponent = styled(Switch)(({theme}) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#aab4be',

            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 30 30"><path fill="${encodeURIComponent(
                '#ff0000',
            )}" d="M12.04,24.24c-0.6,0-1.2-0.14-1.77-0.42c-3.41-1.7-4.87-8.44-5.24-10.46c-0.21-1.16,0.62-2.26,1.83-2.35 c1.03-0.08,1.93,0.7,2.12,1.72c0.56,3.01,1.64,5.75,2.47,6.93c0.29,0.4,0.85,0.5,1.25,0.2c3.04-2.27,7.27-10.01,7.3-12.87 c0.01-0.97,0.74-1.84,1.7-1.99C22.94,4.82,24,5.8,24,7c0,2.86-5.37,14.42-10.11,16.79C13.29,24.09,12.66,24.24,12.04,24.24z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));