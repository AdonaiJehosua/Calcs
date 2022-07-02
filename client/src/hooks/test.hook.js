import {useCallback, useContext, useState} from "react";
import {useHttp} from "./http.hook";
import {AuthContext} from "../context/AuthContext";


export const useTest = () => {
    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchTest = useCallback(async (endpoint) => {

            const fetched = await request(
                `/api/${endpoint}`,
                'GET',
                null,
                {Authorization: `Bearer ${token}`}
            )

        console.log(fetched)


        return fetched
    }, [token, request])

    return {fetchTest, loading}


}