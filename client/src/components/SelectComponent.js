import {useFetchEntries} from "../hooks/fetchEntries.hook";
import {useCallback, useEffect, useState} from "react";
import {MenuItem, TextField} from "@mui/material";
                                                                                                                        /* Компонент, рисующий раскрывающийся список. Значения списка берутся из базы данных. Есть возможность добавить произвольный пункт меню в начало списка. */
                                                                                                                        /*                                                                                                                                                       */
export const SelectComponent = ({                                                                                       /* addItemName - название произвольного пункта списка. */
                                    addItemName,                                                                        /* addItemValue - значение, которое будет присваиваться переменной при выборе произвольно добавленного пункта меню. */
                                    addItemValue,                                                                       /* label - Лейбл списка. */
                                    label,                                                                              /* endpoint - эндпоинт, на который пойдет запрос за данными/*/
                                    nameKey,                                                                            /* nameKey - ключ, по которому из пришедшего из бызы массива, будут отбираться названия пунктов списка.*/
                                    endpoint,                                                                           /* postedValue - ключ, по которому из пришедшего из бызы массива, будут отбираться значения пунктов списка.*/
                                    initialKey,                                                                         /* initialKey - ключ объекта формы, значению которого будет присваиваться значение выбранного пункта списка.*/
                                    touched,                                                                            /* values, errors, touched - объекты Формика. Просто переносятся из компонента формы.*/
                                    values,                                                                             /* handleChange, handleBlur - функции формика. Просто переносятся в пропсах.*/
                                    errors,                                                                             /**/
                                    handleChange,                                                                       /**/
                                    handleBlur,                                                                         /**/
                                    postedValue                                                                         /**/
                                }) => {

    const {entries, fetchEntries} = useFetchEntries()
    const [loaded, setLoaded] = useState(false)

    const fetchValues = useCallback(async () => {
        await fetchEntries(endpoint)
        setLoaded(true)
    }, [endpoint, fetchEntries])

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
                    <MenuItem key={el._id} value={el[postedValue]}>{el[nameKey]}</MenuItem>
                )
            })}
        </TextField>
    )
}