import {useCallback, useState} from "react";
import {useUpdateEntry} from "../hooks/updateEntry.hook";
import {Formik, Form} from "formik";
import Popup from "reactjs-popup";


export const CatalogsTableCol = ({value, inputType, endpoint, entryId, entryKey}) => {

    const [editMode, setEditMode] = useState(false)
    const activateEditMode = () => {
        setEditMode(true)

    }
    const deactivateEditMode = () => {
        setEditMode(false)
    }

    const handleDoubleClick = async () => {
        await activateEditMode()
        let selectedText = document.getElementById('updatingValue')
        selectedText.select()
    }




    const {entryValue, updateEntry} = useUpdateEntry(value)

    const updateHandler = useCallback(async (values) => {
        try {
            await updateEntry({entryKey: entryKey, updatingValue: values.updatingValue}, endpoint, entryId)
            deactivateEditMode()
        } catch (e) {
        }
    }, [])


    return (
        <td className={'center-align'}>
            <Formik
                onSubmit={updateHandler}
                initialValues={{
                    updatingValue: entryValue
                }}
                validate={values => {
                    const errors = {};
                    if (!values.updatingValue) {
                        errors.updatingValue = 'error'
                    }
                    return errors
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      isSubmitting,
                      handleSubmit
                  }) => (
                    <Form>
                        {!editMode && <span onDoubleClick={handleDoubleClick}>{entryValue}</span>}
                        {editMode &&
                        <div>
                            <input
                                id="updatingValue"
                                type={inputType}
                                className={`yellow-input ${errors.updatingValue && touched.updatingValue && errors.updatingValue}`}
                                name="updatingValue"
                                value={values.updatingValue}
                                autoFocus={true}
                                onBlur={handleBlur}
                                onChange={handleChange}/>

                            <Popup trigger={<button type={'button'} className={'btn-small'}>Изменить</button>}
                                   nested>
                                {close => (
                                    <div className={'blue darken-1'}>
                                        <div className={'header white-text'}>Опасность!!!</div>
                                        <div className={'modal-content white-text'}>
                                            Вы уверены, что хотите изменить?
                                        </div>
                                        <button
                                            type={'button'}
                                            className={'teal lighten-1 btn-small'}
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                        >
                                            Уверен
                                        </button>
                                        <button className={'btn-flat'} onClick={() => {
                                            close()
                                        }}>Отмена
                                        </button>
                                    </div>
                                )}
                            </Popup>
                            <button onClick={deactivateEditMode} className={'btn-flat'}>Отмена</button>
                        </div>}
                    </Form>
                )}
            </Formik>
        </td>
    )
}