import {useFetchEntries} from "../hooks/fetchEntries.hook";
import {useCallback, useEffect, useState} from "react";
import {MenuItem, TextField} from "@mui/material";


export const SelectComponent = ({
                                    addItemName,
                                    addItemValue,
                                    label,
                                    nameKey,
                                    endpoint,
                                    initialKey,
                                    touched,
                                    values,
                                    errors,
                                    handleChange,
                                    handleBlur
                                }) => {

    const {entries, fetchEntries} = useFetchEntries()
    const [loaded, setLoaded] = useState(false)

    const fetchValues = useCallback(async () => {
        await fetchEntries(endpoint)
        setLoaded(true)
    }, [])

    useEffect(() => {
        fetchValues()
    }, [fetchValues])

    if (loaded) return (
        <TextField select fullWidth
                   error={touched[initialKey] && Boolean(errors[initialKey])}
                   helperText={touched[initialKey] && errors[initialKey]}
                   id={initialKey}
                   name={initialKey}
                   value={values[initialKey]}
                   label={label}
                   onChange={handleChange}
                   onBlur={handleBlur}>
            {addItemName && <MenuItem value={addItemValue}>{addItemName}</MenuItem>}
            {entries.map((el) => {
                return (
                    <MenuItem key={el._id} value={el._id}>{el[nameKey]}</MenuItem>
                )
            })}
        </TextField>
    )
}