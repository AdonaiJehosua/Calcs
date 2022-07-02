import Popup from "reactjs-popup";
import {useCallback} from "react";
import {useDeleteEntry} from "../hooks/deleteEntry.hook";

//Кнопка для удаления записи из базы данных. Принимает функцию, которая будет подтягивать с сервера обновленные данные,
// эндпоинт, на который идет запрос на удаление и обновление данных, id записи и имя записи из бызы

export const DeleteEntryButton = ({fetchEntries, endpoint, entryId, entryName}) => {

    const {deleteEntry} = useDeleteEntry()

    const deleteFunction = useCallback(async () => {
        await deleteEntry(endpoint, entryId)
        fetchEntries()
    })

    return (
        <Popup trigger={<button className={'btn-small'}>Удалить</button>} nested>
            {close => (
                <div className={'blue darken-1'}>
                    <div className={'header white-text'}>Опасность!!!</div>
                    <div className={'modal-content white-text'}>
                        Вы уверены, что хотите удалить {entryName}?
                    </div>
                    <button autoFocus={'true'} className={'btn-small'} onClick={() => {
                        deleteFunction()
                    }}>Да</button>
                    <button className={'btn-small'} onClick={() => {close()}}>Отмена</button>
                </div>
            )}
        </Popup>
    )
}