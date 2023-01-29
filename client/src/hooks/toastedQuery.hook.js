import {useQuery} from "@apollo/client";
import {toast} from "react-toastify";
import {useState} from "react";


export const useToastedQuery = (query, variables) => {
    const [entries, setEntries] = useState([])
    const {loading, error, data} = useQuery(query, {variables: variables})
    const makeQuery = (queryName) => {
        try {
            if (error) {
                toast.error(error.message)
            }
            setEntries(data[queryName])
        } catch (e) {}
    }
    return {entries, loading, makeQuery}
}