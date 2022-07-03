import {useFetchEntries} from "../hooks/fetchEntries.hook";
import {useCallback, useEffect, useState} from "react";
import {createTheme, FormControl, InputLabel, MenuItem, Select} from "@mui/material";


export const SelectComponent = ({label, nameKey, endpoint}) => {




    const {entries, fetchEntries} = useFetchEntries()
    const [loading, setLoading] = useState(false)
    const [select, setSelect] = useState('')

    const handleChange = (event) => {
        setSelect(event.target.value);
    };


    const fetchFormats = useCallback(async () => {
        await fetchEntries(endpoint)
        setLoading(true)
    }, [])

    useEffect(() => {
        fetchFormats()
    }, [fetchFormats])

    if (loading) return (
            <FormControl fullWidth>
                <InputLabel id="selectInputLabel">{label}</InputLabel>
                <Select
                    labelId="selectInputLabel"
                    id="demo-simple-select"
                    value={select}
                    label="selectInput"
                    onChange={handleChange}
                >
                    {entries.map((el) => {
                        return (
                            <MenuItem key={el._id} value={el._id}>{el[nameKey]}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
    )
}