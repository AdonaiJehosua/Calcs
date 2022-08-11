import {useMutation} from "@apollo/client";
import {toast} from "react-toastify";
import {useEffect} from "react";

// Хук графкуэльной мутации. Для создания новых документов в базе данных. Принимает имя заранее созданной мутации *ОБЯЗАТЕЛЬНО*.
// Метод response в свою очередь, принимает: 1. Объект переменных для мутации *ОБЯЗАТЕЛЬНО*. 2 - собственно, объект значений формика *ОБЯЗАТЕЛЬНО*. 2 - массив представленных строками идентификаторов значений, которые должны обнуляться в инпутах при успешном создании документа *ОПЦИОНАЛЬНО* - на случай, если обнулять нужно не все значения формы.
// Если мутация успешна, сообщение из ответа пуляется во всплывающее сообщение. Если имела место ошибка, она пуляется во всплывающее сообщение об ошибке. Тиакие пироги.

export const useToastedMutation = (query) => {
    const [mutation, {data}] = useMutation(query)
    const makeMutation = async (variables, values, resetValues) => {
        try {
            await mutation({variables: variables})

            if (values) {
                if (!resetValues) {
                    const resetValues = Object.keys(values)
                    resetValues.forEach(el => values[el] = '')
                } else {
                    resetValues.forEach(el => values[el] = '')
                }
            }
        } catch (e) {
            toast.error(e.message)
        }
    }
    useEffect(() => {
        if (data && data.message) {
            toast(data.message)
        }
    }, [data])
    return {makeMutation}
}