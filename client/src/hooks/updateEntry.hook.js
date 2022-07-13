import {useHttp} from "./http.hook";
import {useCallback, useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";


export const useUpdateEntry = (value) => {
    const [entryValue, setEntryValue] = useState(value)
    const {request} = useHttp()
    const {token} = useContext(AuthContext)

const updateEntry = useCallback( async(reqBody, endpoint, entryId) => {
    try {
        const data = await request(
            `/api/${endpoint}/${entryId}/changeentryvalue`,
            'PUT',
            {...reqBody},
            {Authorization: `Bearer ${token}`})
        setEntryValue(data.updatedValue)

    } catch (e) {
    }
    }, [token, request])



    return {entryValue, updateEntry}
}