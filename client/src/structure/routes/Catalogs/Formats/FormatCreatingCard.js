import {useState} from "react";
import {Formik, Form} from "formik";
import {Box, Button, Card, CardActions, CardContent, Container, Modal, TextField, Typography} from "@mui/material";
import {useCreateDocumentMutation} from "../../../../hooks/createDocumentMutation.hook";
import {ADD_FORMAT} from "../../../../graphQL/mutations/formatsMutations";

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

export const FormatCreatingCard = () => {

    const {response} = useCreateDocumentMutation(ADD_FORMAT)

    const createHandler = async (values) => {
        const variables = {
            formatName: values.formatName,
            dimensions: {
                longSide: values.longSide,
                shortSide: values.shortSide
            }
        }
        await response(variables, values)
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant={'contained'} onClick={handleOpen}>Добавить</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik
                        onSubmit={createHandler}
                        initialValues={{
                            formatName: '', longSide: '', shortSide: ''
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.formatName) {
                                errors.formatName = 'Введите название'
                            }
                            if (!values.longSide) {
                                errors.longSide = 'Введите значение длинной стороны'
                            }
                            if (!values.shortSide) {
                                errors.shortSide = 'Введите значение короткой стороны'
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
                                        <Typography variant={'h4'}>Добавить формат</Typography>
                                        <Container>
                                            <TextField
                                                error={touched.formatName && Boolean(errors.formatName)}
                                                helperText={touched.formatName && errors.formatName}
                                                label={'Название'}
                                                id="formatName"
                                                type="text"
                                                name="formatName"
                                                value={values.formatName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <TextField
                                                error={touched.longSide && Boolean(errors.longSide)}
                                                helperText={touched.longSide && errors.longSide}
                                                label={'Длинная сторона'}
                                                id="longSide"
                                                type="number"
                                                name="longSide"
                                                value={values.longSide}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <TextField
                                                error={touched.shortSide && Boolean(errors.shortSide)}
                                                helperText={touched.shortSide && errors.shortSide}
                                                label={'Ширина'}
                                                id="shortSide"
                                                type="number"
                                                name="shortSide"
                                                value={values.shortSide}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Container>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            variant={'contained'}
                                            type={'submit'}
                                            style={{marginRight: 10}}
                                            disabled={isSubmitting}
                                        >
                                            Создать
                                        </Button>
                                        <Button
                                            variant={'outlined'}
                                            type={'button'}
                                            disabled={isSubmitting}
                                            onClick={handleClose}
                                        >
                                            Закрыть
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </>
    )
}