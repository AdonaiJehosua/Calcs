import {useState} from "react";
import {Formik, Form} from "formik";
import {Button, Card, CardActions, CardContent, Container, Modal, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useToastedMutation} from "../../../../hooks/toastedMutation.hook";
import {ADD_UNIT} from "../../../../graphQL/mutations/unitMutation";
import {FETCH_UNITS} from "../../../../graphQL/queries/unitQueries";

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

export const UnitCreatingCard = () => {

    const {makeMutation} = useToastedMutation(ADD_UNIT, FETCH_UNITS, 'units')


    const createHandler = async (values) => {
        const variables = {
            fullName: values.fullName,
            abbreviatedName: values.abbreviatedName
        }
        await makeMutation(variables, values)
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

            <Modal open={open}
                   onClose={handleClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
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
                                <Card>
                                    <CardContent>
                                        <Typography variant={'h4'}>Добавить единицу измерения</Typography>
                                        <Container>
                                            <TextField
                                                label={'Полное название'}
                                                id="fullName"
                                                type="text"
                                                className={`yellow-input ${errors.fullName && touched.fullName && errors.fullName}`}
                                                name="fullName"
                                                value={values.fullName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <TextField
                                                label={'Сокращенное название'}
                                                id="abbreviatedName"
                                                type="text"
                                                className={`yellow-input ${errors.abbreviatedName && touched.abbreviatedName && errors.abbreviatedName}`}
                                                name="abbreviatedName"
                                                value={values.abbreviatedName}
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