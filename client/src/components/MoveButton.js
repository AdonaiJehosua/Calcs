import { useState } from "react"
import { Button, Card, CardActions, CardContent, Popover, Typography, IconButton } from "@mui/material"
import { UPDATE_ORDER_STATUS } from "../graphQL/mutations/orderMutations"
import { FETCH_ORDERS } from "../graphQL/queries/orderQueries"
import { useToastedMutation } from "../hooks/toastedMutation.hook"


function yesFunc() {
    alert('Punk')
}


export function MoveButton({ buttonComponent, buttonColor, popupTitle, popupText, bgColor, fontColor, moveDirection, updateOrderStatusId, status }) {

    const [anchorEl, setAnchorEl] = useState(null)
    const { makeMutation } = useToastedMutation(UPDATE_ORDER_STATUS, FETCH_ORDERS, 'orders')

    const newStatus = () => {
        if (moveDirection === 'forward') {
            switch(status) {
                case 'prepress':
                    return 'press'
                case 'press':
                    return 'postpress'
                case 'postpress':
                    return 'complited'
                default:
                    return status    
            }
        }
        if (moveDirection === 'back') {
            switch(status) {
                case 'press':
                    return 'prepress'
                case 'postpress':
                    return 'press'
                case 'complited':
                    return 'postpress'
                default:
                    return status    
            }
        }
        if (moveDirection === 'complited') {
            return 'complited'
        }
        
    }

    const updateStatusHendler = async () => {
        const variables = {
            updateOrderStatusId: updateOrderStatusId,
            status: newStatus(),
        }
        await makeMutation(variables)
        handleClose()
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }


    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

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
                <Card sx={{ bgcolor: bgColor, color: fontColor }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 24 }}>{popupTitle}</Typography>
                        <Typography>
                            {popupText}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button autoFocus={true} variant={'contained'} onClick={updateStatusHendler}>
                            Да
                        </Button>
                        <Button variant={'outlined'} onClick={handleClose}>Отмена</Button>
                    </CardActions>
                </Card>
            </Popover>
        </>

    )
}