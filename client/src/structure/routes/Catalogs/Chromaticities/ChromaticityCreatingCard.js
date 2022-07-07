import {useCallback, useEffect, useState} from "react";
import {Formik, Form} from "formik";
import Popup from "reactjs-popup";
import {useCreateEntry} from "../../../../hooks/createEntry.hook";
import validator from "validator";
import {useMessage} from "../../../../hooks/message.hook";
import {Button, Card, CardActions, CardContent, Container, Modal, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";

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

export const СhromaticityCreatingCard = ({fetchEntries}) => {

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
                            front: '', back: ''
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.front) {
                                errors.front = 'Введите цветность лицевой стороны'
                            }
                            if (validator.isEmpty(String(values.back))) {
                                errors.back = 'Введите цветность оборотной стороны'
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
                                                <Typography variant={'h4'}>Добавить цветность</Typography>
                                                       <Container>
                                                        <TextField
                                                            error={touched.front && Boolean(errors.front)}
                                                            helperText={touched.front && errors.front}
                                                            label={'Лицо'}
                                                            id="front"
                                                            type="number"
                                                            name="front"
                                                            value={values.front}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        <TextField
                                                            error={touched.back && Boolean(errors.back)}
                                                            helperText={touched.back && errors.back}
                                                            label={'Оборот'}
                                                            id="back"
                                                            type="number"
                                                            name="back"
                                                            value={values.back}
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
                                                    variant={'contained'}
                                                    className={'btn-flat'}
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