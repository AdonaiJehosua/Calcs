import {useHttp} from "./http.hook";
import {useCallback, useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "./message.hook";


export const useCreateEntry = () => {
    const {request, error, clearError} = useHttp()
    const {token} = useContext(AuthContext)
    const message = useMessage()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

const createEntry = useCallback( async(reqBody, collectionName, endpoint) => {
    try {
        const data = await request(
            `/api/${collectionName}/${endpoint}`,
            'POST',
            {...reqBody},
            {Authorization: `Bearer ${token}`})
        message(data.message)

    } catch (e) {
    }
    }, [token, request])

    return {createEntry}
}