import {useHttp} from "./http.hook";
import {useCallback, useContext} from "react";
import {AuthContext} from "../context/AuthContext";


export const useCreateEntry = () => {
    const {request} = useHttp()
    const {token} = useContext(AuthContext)

    const createEntry = useCallback(async (reqBody, collectionName, endpoint) => {
        try {
            await request(
                `/api/${collectionName}/${endpoint}`,
                'POST',
                {...reqBody},
                {Authorization: `Bearer ${token}`})
        } catch (e) {
        }
    }, [token, request])

    return {createEntry}
}