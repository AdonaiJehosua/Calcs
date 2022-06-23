import {useCallback, useEffect} from "react";
import {Formik, Form} from "formik";
import Popup from "reactjs-popup";
import {useCreateEntry} from "../../../../hooks/createEntry.hook";

export const UnitCreatingCard = ({fetchEntries}) => {

    const {createEntry} = useCreateEntry()

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const createHandler = useCallback(async (values) => {
        try {
            const reqBody = {fullName: values.fullName, abbreviatedName: values.abbreviatedName}
            await createEntry(reqBody, 'unit', 'createunit')
            fetchEntries()
            values.fullName = ''
            values.abbreviatedName = ''
        } catch (e) {
        }
    }, [])


    return (
        <Popup trigger={<button className={'btn-small'}>Добавить</button>} modal nested>
            {close => (
                <Formik
                    onSubmit={createHandler}
                    initialValues={{
                        fullName: '', abbreviatedName: ''
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.fullName) {
                            errors.fullName = 'error'
                        }
                        if (!values.abbreviatedName) {
                            errors.abbreviatedName = 'error'
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
                                    <div className="card blue darken-1">
                                        <div className="row right-align">
                                        </div>
                                        <div className="card-content white-text">

                                            <span className="card-title">Добавить единицу измерения</span>
                                            <div>
                                                <div className="input-field ">
                                                    <input
                                                        id="fullName"
                                                        type="text"
                                                        className={`yellow-input ${errors.fullName && touched.fullName && errors.fullName}`}
                                                        name="fullName"
                                                        value={values.fullName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />

                                                    <label
                                                        htmlFor="fullName"
                                                        className={`white-text active ${errors.fullName && touched.fullName && errors.fullName}`}>Полное название</label>
                                                </div>
                                                <div className="input-field ">
                                                    <input
                                                        id="abbreviatedName"
                                                        type="text"
                                                        className={`yellow-input ${errors.abbreviatedName && touched.abbreviatedName && errors.abbreviatedName}`}
                                                        name="abbreviatedName"
                                                        value={values.abbreviatedName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <label
                                                        htmlFor="abbreviatedName"
                                                        className={`white-text active ${errors.abbreviatedName && touched.abbreviatedName && errors.abbreviatedName}`}>Укажите
                                                        высоту, мм</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-action">
                                            <button
                                                className={'btn'}
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