import {useCallback, useContext, useState} from "react";
import {useHttp} from "./http.hook";
import {AuthContext} from "../context/AuthContext";


export const useFetchEntries = () => {
    const [entries, setEntries] = useState([])
    const {request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchEntries = useCallback(async (endpoint) => {
        try {
            const fetched = await request(
                `/api/${endpoint}`,
                'GET',
                null,
                {Authorization: `Bearer ${token}`}
            )
            setEntries(fetched)
            return fetched
        } catch (e) {
        }
    }, [token, request])


    return {entries, fetchEntries}


}