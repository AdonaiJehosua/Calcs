import {useCallback, useEffect} from "react";
import {Formik, Form} from "formik";
import Popup from "reactjs-popup";
import {useCreateEntry} from "../../../../hooks/createEntry.hook";

export const FormatCreatingCard = ({fetchEntries}) => {

    const {createEntry} = useCreateEntry()


    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const createHandler = useCallback(async (values) => {
        try {
            const reqBody = {formatName: values.formatName, dimensions: {height: values.height, width: values.width}}
            await createEntry(reqBody, 'format', 'createformat')
            fetchEntries()
            values.formatName = ''
            values.height = ''
            values.width = ''
        } catch (e) {
        }
    }, [])


    return (
        <Popup trigger={<button className={'btn-small'}>Добавить</button>} modal nested>
            {close => (
                <Formik
                    onSubmit={createHandler}
                    initialValues={{
                        formatName: '', height: '', width: ''
                    }}
                    validate={values => {
                        const errors = {};
                        // if (!values.formatName) {
                        //     errors.formatName = 'error'
                        // }
                        if (!values.height) {
                            errors.height = 'error'
                        }
                        if (!values.width) {
                            errors.width = 'error'
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
                          isSubmitting
                      }) => (
                        <Form>
                            <div>
                                <div>
                                    <div className="card yellow darken-1">
                                        <div className="row right-align">
                                        </div>
                                        <div className="card-content white-text">

                                            <span className="card-title">Добавить формат</span>
                                            <div>
                                                <div className="input-field ">
                                                    <input
                                                        id="formatName"
                                                        type="text"
                                                        className={`yellow-input ${errors.formatName && touched.formatName && errors.formatName}`}
                                                        name="formatName"
                                                        value={values.formatName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />

                                                    <label
                                                        htmlFor="formatName"
                                                        className={`active ${errors.formatName && touched.formatName && errors.formatName}`}>Название</label>
                                                </div>
                                                <div className="input-field ">
                                                    <input
                                                        id="height"
                                                        type="number"
                                                        className={`yellow-input ${errors.height && touched.height && errors.height}`}
                                                        name="height"
                                                        value={values.height}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <label
                                                        htmlFor="height"
                                                        className={`active ${errors.height && touched.height && errors.height}`}>Укажите
                                                        высоту, мм</label>
                                                </div>
                                                <div className="input-field ">
                                                    <input
                                                        id="width"
                                                        type="number"
                                                        className={`yellow-input ${errors.width && touched.width && errors.width}`}
                                                        name="width"
                                                        value={values.width}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <label
                                                        htmlFor="width"
                                                        className={`active ${errors.width && touched.width && errors.width}`}>Укажите
                                                        ширину, мм</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-action">
                                            <button
                                                className={'btn yellow darken-4'}
                                                type={'submit'}
                                                style={{marginRight: 10}}
                                                disabled={isSubmitting}
                                            >
                                                Создать
                                            </button>
                                            <button
                                                className={'btn-flat'}
                                                type={'button'}
                                                disabled={isSubmitting}
                                                onClick={() => {
                                                    close()
                                                }}
                                            >
                                                Закрыть
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Form>
                    )}
                </Formik>
            )}
        </Popup>

    )
}