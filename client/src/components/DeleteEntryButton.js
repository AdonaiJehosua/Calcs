import {useCallback, useState} from "react";
import {useDeleteEntry} from "../hooks/deleteEntry.hook";
import {Button, Card, CardActions, CardContent, Popover, Typography} from "@mui/material";

//Кнопка для удаления записи из базы данных. Принимает функцию, которая будет подтягивать с сервера обновленные данные,
// эндпоинт, на который идет запрос на удаление и обновление данных, id записи и имя записи из бызы

export const DeleteEntryButton = ({fetchEntries, endpoint, entryId, entryName}) => {

    const {deleteEntry} = useDeleteEntry()

    const deleteFunction = useCallback(async () => {
        await deleteEntry(endpoint, entryId)
        await fetchEntries()
    })

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
        <Button aria-describedby={id} variant={'contained'} onClick={handleClick}>
            Удалить
        </Button>

            <Popover id={id}
                     open={open}
                     anchorEl={anchorEl}
                     onClose={handleClose}
                     anchorOrigin={{
                         vertical: 'bottom',
                         horizontal: 'left',
                     }}>
                <Card>
                    <CardContent>
                    <Typography sx={{fontSize: 14}}>Опасность!!!</Typography>
                    <Typography>
                        Вы уверены, что хотите удалить {entryName}?
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button autoFocus={true} variant={'contained'} onClick={() => {
                        deleteFunction()
                    }}>Да</Button>
                    <Button variant={'outlined'} onClick={handleClose}>Отмена</Button>
                    </CardActions>
                </Card>
            </Popover>
        </>
    )
}