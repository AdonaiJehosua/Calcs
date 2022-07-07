import {useCallback, useState} from "react";
import {Formik, Form} from "formik";
import {useCreateEntry} from "../../../../hooks/createEntry.hook";
import {Box, Button, Card, CardActions, CardContent, Container, Modal, TextField, Typography} from "@mui/material";

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

export const FormatCreatingCard = ({fetchEntries}) => {

    const {createEntry} = useCreateEntry()

    const createHandler = useCallback(async (values) => {
        try {
            const reqBody = {formatName: values.formatName, dimensions: {height: values.height, width: values.width}}
            await createEntry(reqBody, 'format', 'createformat')
            await fetchEntries()
            values.formatName = ''
            values.height = ''
            values.width = ''
        } catch (e) {
        }
    }, [fetchEntries])

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
                            formatName: '', height: '', width: ''
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.formatName) {
                                errors.formatName = 'Введите название'
                            }
                            if (!values.height) {
                                errors.height = 'Введите высоту'
                            }
                            if (!values.width) {
                                errors.width = 'Введите ширину'
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
                                                    error={touched.height && Boolean(errors.height)}
                                                    helperText={touched.height && errors.height}
                                                    label={'Высота'}
                                                    id="height"
                                                    type="number"
                                                    name="height"
                                                    value={values.height}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <TextField
                                                    error={touched.width && Boolean(errors.width)}
                                                    helperText={touched.width && errors.width}
                                                    label={'Ширина'}
                                                    id="width"
                                                    type="number"
                                                    name="width"
                                                    value={values.width}
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