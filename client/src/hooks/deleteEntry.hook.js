import {useCallback, useContext} from "react";
import {useHttp} from "./http.hook";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "./message.hook";

export const useDeleteEntry = () => {
    const {request} = useHttp()
    const {token} = useContext(AuthContext)
    const message = useMessage()


    const deleteEntry = useCallback(async (endpoint, entryId) => {
        try {
            const data = await request(
                `/api/${endpoint}/${entryId}`,
                'DELETE',
                null,
                {Authorization: `Bearer ${token}`}
            )
            message(data.message)
        } catch (e) {
        }
    }, [token, request])

    return {deleteEntry}
}