import {useContext, useEffect} from "react";
import {useHttp} from "../../../hooks/http.hook";
import {AuthContext} from "../../../context/AuthContext";
import {Button, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
import {Formik, Form} from "formik";
import {useMutation} from "@apollo/client";
import {AUTH} from "../../../graphQL/mutations/authMutations";
import {toast} from "react-toastify";
import {useToastedMutation} from "../../../hooks/toastedMutation.hook";

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

    const {makeMutation, data, loading} = useToastedMutation(AUTH)

    const loginHandler = async (values) => {
        try {
            await makeMutation({userName: values.userName, password: values.password})
            await auth.login(data.login.token, data.login.id)
        } catch (e) {
        }
    }

    let submitAction = undefined

    const registerHandler = async (values) => {
    }
    //     try {
    //         const body = {email: values.email, password: values.password}
    //         await request('/api/auth/register', 'POST',
    //             body)
    //     } catch (e) {
    //     }
    // }

    return (
        <Formik
            onSubmit={async (values) => {
                if (submitAction === 'login') {
                    await loginHandler(values)
                }
                if (submitAction === 'register') {
                    await registerHandler(values)
                }
            }}
            initialValues={{
                userName: '', password: ''
            }}
            validate={values => {
                const errors = {};
                if (!values.userName) {
                    errors.userName = 'Введите имя пользователя'
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
                  handleChange
              }) => (
                <Form>
                    <Card sx={style}>
                        <CardContent>
                            <Typography variant={'h3'}>iCALC</Typography>
                            <Typography variant={'h4'}>Авторизация</Typography>
                            <TextField
                                error={touched.userName && Boolean(errors.userName)}
                                helperText={touched.userName && errors.userName}
                                label={'Логин'}
                                id="userName"
                                type="text"
                                name="userName"
                                value={values.userName}
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