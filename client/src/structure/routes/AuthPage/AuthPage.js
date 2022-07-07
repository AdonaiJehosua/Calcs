import {useContext, useEffect} from "react";
import {useHttp} from "../../../hooks/http.hook";
import {useMessage} from "../../../hooks/message.hook";
import {AuthContext} from "../../../context/AuthContext";
import {Button, Card, CardActions, CardContent, Container, TextField, Typography} from "@mui/material";
import {Formik, Form} from "formik";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
};

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    let submitAction = undefined


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
            onSubmit={(values) => {
                if (submitAction === 'login') {
                    loginHandler(values)
                }
                if (submitAction === 'register') {
                    registerHandler(values)
                }
            }}
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
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  isSubmitting
              }) => (
                <Form>
                    <Card sx={style}>
                        <CardContent>
                            <Typography variant={'h3'}>iCALC</Typography>
                            <Typography variant={'h4'}>Авторизация</Typography>
                            <TextField
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                label={'Логин'}
                                id="email"
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <TextField
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
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
                                type={'button'}
                                onClick={() => {
                                    submitAction = 'login'
                                    handleSubmit()
                                }}
                                onSubmit={loginHandler}
                                disabled={loading}
                            >
                                Войти
                            </Button>
                            <Button
                                type={'button'}
                                onClick={() => {
                                    submitAction = 'register'
                                    handleSubmit()
                                }}
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