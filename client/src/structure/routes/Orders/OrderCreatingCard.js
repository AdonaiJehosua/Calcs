import { useState } from "react";
import { Formik, Form } from "formik";
import { Box, Button, Card, CardActions, CardContent, Container, Modal, TextField, Typography } from "@mui/material";
import { useToastedMutation } from "../../../hooks/toastedMutation.hook"
import { ADD_FORMAT } from "../../../graphQL/mutations/formatsMutations"
import { FETCH_FORMATS } from "../../../graphQL/queries/formatQueries"
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { SelectComponent } from "../../../components/SelectComponent";

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

export const OrderCreatingCard = () => {

    const { makeMutation } = useToastedMutation(ADD_FORMAT, FETCH_FORMATS, 'formats')

    const createHandler = async (values) => {
        // const variables = {
        //     formatName: values.formatName,
        //     dimensions: {
        //         longSide: values.longSide,
        //         shortSide: values.shortSide
        //     }
        // }
        // await makeMutation(variables, values)
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
                            number1c: '', productionType: '', shortSide: ''
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.number1c) {
                                errors.number1c = 'Введите название'
                            }
                            if (!values.productionType) {
                                errors.productionType = 'Введите значение длинной стороны'
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
                                        <Typography variant={'h4'}>Новый заказ</Typography>
                                        <Container>
                                            <TextField
                                                error={touched.number1c && Boolean(errors.number1c)}
                                                helperText={touched.number1c && errors.number1c}
                                                label={'Номер в 1С'}
                                                id="number1c"
                                                type="number"
                                                name="number1c"
                                                value={values.number1c}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <SelectComponent/>
                                            
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
                                            style={{ marginRight: 10 }}
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