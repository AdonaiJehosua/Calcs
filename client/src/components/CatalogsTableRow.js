import {useCallback, useState} from "react";
import {useUpdateEntry} from "../hooks/updateEntry.hook";
import {Formik, Form} from "formik";
import Popup from "reactjs-popup";


export const CatalogsTableRow = ({value, inputType, endpoint, entryId, entryKey}) => {

    const [editMode, setEditMode] = useState(false)
    const activateEditMode = () => {
        setEditMode(true)
    }
    const dectivateEditMode = () => {
        setEditMode(false)
    }


    const {entryValue, updateEntry} = useUpdateEntry(value)

    const updateHandler = useCallback(async (values) => {
        try {
            await updateEntry({entryKey: entryKey, updatingValue: values.updatingValue}, endpoint, entryId)
            dectivateEditMode()
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
                        {!editMode && <span onDoubleClick={activateEditMode}>{entryValue}</span>}
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

                            <Popup trigger={<button type={'button'} className={'btn-small'}>Изменить</button>} modal
                                   nested>
                                {close => (
                                    <div className={'blue darken-1'}>
                                        <div className={'header'}>Опасность!!!</div>
                                        <div className={'modal-content'}>
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
                                        <button className={'btn-small'} onClick={() => {
                                            close()
                                        }}>Отмена
                                        </button>
                                    </div>
                                )}
                            </Popup>
                        </div>}
                    </Form>
                )}
            </Formik>
        </td>
    )
}