import {useQuery} from "@apollo/client";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";


export const useGraphqlQuery = (query) => {
    const [entries, setEntries] = useState([])
    const {loading, error, data} = useQuery(query)
    const request = (arrayName) => {
        try {
            if (error) {
                toast.error(error.message)
            }
            setEntries(data[arrayName])
        } catch (e) {
            // toast.error(e.message)
        }
    }
    return {entries, loading, request}
}