import {useHttp} from "./http.hook";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "./message.hook";


export const useUpdateEntry = (value) => {
    const [entryValue, setEntryValue] = useState(value)
    const {request, error, clearError} = useHttp()
    const {token} = useContext(AuthContext)
    const message = useMessage()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

const updateEntry = useCallback( async(reqBody, endpoint, entryId) => {
    try {
        const data = await request(
            `/api/${endpoint}/${entryId}/changeentryvalue`,
            'PUT',
            {...reqBody},
            {Authorization: `Bearer ${token}`})
        message(data.message)
        setEntryValue(data.updatedValue)

    } catch (e) {
    }
    }, [token, request])



    return {entryValue, updateEntry}
}