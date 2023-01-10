import { useState } from "react";
import { Button, Card, CardActions, CardContent, Popover, Typography, IconButton } from "@mui/material";


function yesFunc() {
    alert('Punk')
}


export function MoveButton({buttonComponent, buttonColor, buttonFunction, popupTitle, popupText, bgColor, fontColor}) {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <IconButton aria-describedby={id} variant="contained" onClick={handleClick} color={buttonColor}>
                {buttonComponent}
            </IconButton>
            <Popover
                autoFocus={true}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                <Card sx={{bgcolor: bgColor, color: fontColor}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 24 }}>{popupTitle}</Typography>
                        <Typography>
                            {popupText}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button autoFocus={true} variant={'contained'} onClick={async () => {
                            await buttonFunction()
                            handleClose()
                        }}>Да</Button>
                        <Button variant={'outlined'} onClick={handleClose}>Отмена</Button>
                    </CardActions>
                </Card>
            </Popover>
        </>

    )
}