import {useFetchEntries} from "../hooks/fetchEntries.hook";
import {useCallback, useEffect, useState} from "react";
import {MenuItem, TextField} from "@mui/material";


export const SelectComponent = ({addItem, label, nameKey, endpoint, initialKey, touched, values, errors, handleChange, handleBlur}) => {

    const {entries, fetchEntries} = useFetchEntries()
    const [loading, setLoading] = useState(false)

    const fetchValues = useCallback(async () => {
        await fetchEntries(endpoint)
        setLoading(true)
    }, [])

    useEffect(() => {
        fetchValues()
    }, [fetchValues])

    if (loading) return (
            <TextField select fullWidth
                       error={touched[initialKey] && Boolean(errors[initialKey])}
                       helperText={touched[initialKey] && errors[initialKey]}
                       id={initialKey}
                       name={initialKey}
                       value={values[initialKey]}
                       label={label}
                       onChange={handleChange}
                       onBlur={handleBlur}>
                {addItem && <MenuItem value={addItem}>{addItem}</MenuItem>}
                    {entries.map((el) => {
                        return (
                            <MenuItem key={el._id} value={el._id}>{el[nameKey]}</MenuItem>
                        )
                    })}
            </TextField>
    )
}