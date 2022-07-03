import {useContext, useEffect, useState} from "react";
import {useHttp} from "../../../hooks/http.hook";
import {useMessage} from "../../../hooks/message.hook";
import {AuthContext} from "../../../context/AuthContext";
import {Button, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
import {Formik, Form} from "formik";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])


    const registerHandler = async (values) => {
        try {
            const body = {email: values.email, password: values.password}
            const data = await request('/api/auth/register', 'POST',
                body)
            message(data.message)
        } catch (e) {
        }
    }

    const loginHandler = async (values) => {
        try {
            const body = {email: values.email, password: values.password}
            const data = await request('/api/auth/login', 'POST',
                body)
            auth.login(data.token, data.userId)
        } catch (e) {
        }
    }

    return (
        <Formik
            onSubmit={handleS}
            initialValues={{
                email: '', password: ''
            }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Введите email'
                }
                if (!values.password) {
                    errors.password = 'Введите password'
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
                    <Card>
                        <CardContent>
                            <Typography variant={'h3'}>iCALC</Typography>
                            <Typography variant={'h4'}>Авторизация</Typography>
                            <TextField
                                label={'Логин'}
                                id="email"
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <TextField
                                label={'Пароль'}
                                id="password"
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                            />
                        </CardContent>
                        <CardActions>
                            <Button
                                variant={'contained'}
                                type={'submit'}
                                onSubmit={loginHandler}
                                disabled={loading}
                            >
                                Войти
                            </Button>
                            <Button
                                variant={'contained'}
                                onSubmit={registerHandler}
                                disabled={loading}
                            >
                                Регистрация
                            </Button>
                        </CardActions>
                    </Card>
                </Form>
            )}
        </Formik>


    )
}