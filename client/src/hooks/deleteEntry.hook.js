import {useCallback, useContext} from "react";
import {useHttp} from "./http.hook";
import {AuthContext} from "../context/AuthContext";

export const useDeleteEntry = () => {
    const {request} = useHttp()
    const {token} = useContext(AuthContext)

    const deleteEntry = useCallback(async (endpoint, entryId) => {
        try {
            await request(
                `/api/${endpoint}/${entryId}`,
                'DELETE',
                null,
                {Authorization: `Bearer ${token}`}
            )
        } catch (e) {
        }
    }, [token, request])

    return {deleteEntry}
}