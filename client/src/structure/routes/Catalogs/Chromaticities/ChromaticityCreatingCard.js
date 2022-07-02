import {useCallback, useEffect} from "react";
import {Formik, Form} from "formik";
import Popup from "reactjs-popup";
import {useCreateEntry} from "../../../../hooks/createEntry.hook";
import validator from "validator";
import {useMessage} from "../../../../hooks/message.hook";

export const СhromaticityCreatingCard = ({fetchEntries}) => {

    const message = useMessage()

    const {createEntry} = useCreateEntry()

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const createHandler = useCallback(async (values) => {
        try {
            const reqBody = {front: values.front, back: values.back}
            await createEntry(reqBody, 'chromaticity', 'createchromaticity')
            fetchEntries()
            values.front = ''
            values.back = ''
        } catch (e) {
        }
    }, [])


    return (
        <Popup trigger={<button className={'btn-small'}>Добавить</button>} modal nested>
            {close => (
                <Formik
                    onSubmit={createHandler}
                    initialValues={{
                        front: '', back: ''
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.front) {
                            errors.front = 'error'
                        }
                        if (validator.isEmpty(String(values.back))) {
                            errors.back = 'error'
                            message('Введите данные')
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
                                                        id="front"
                                                        type="number"
                                                        className={`yellow-input ${errors.front && touched.front && errors.front}`}
                                                        name="front"
                                                        value={values.front}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />

                                                    <label
                                                        htmlFor="front"
                                                        className={`white-text active 
                                                        ${errors.front && touched.front && errors.front}`}>
                                                        Лицевая сторона</label>
                                                </div>
                                                <div className="input-field ">
                                                    <input
                                                        id="back"
                                                        type="number"
                                                        className={`yellow-input ${errors.back && touched.back && errors.back}`}
                                                        name="back"
                                                        value={values.back}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <label
                                                        htmlFor="back"
                                                        className={`white-text active 
                                                        ${errors.back && touched.back && errors.back}`}>
                                                        Оборотная сторона</label>
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