import { useState } from "react";
import { Formik, Form } from "formik";
import { Button, Card, CardActions, CardContent, Container, Modal, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useToastedMutation } from "../../../../hooks/toastedMutation.hook";
import { ADD_UNIT } from "../../../../graphQL/mutations/unitMutation";
import { FETCH_UNITS } from "../../../../graphQL/queries/unitQueries";
import { ADD_PRODUCTION_TYPE } from "../../../../graphQL/mutations/productionTypeMutation";
import { FETCH_PRODUCTION_TYPES } from "../../../../graphQL/queries/productionTypesQueries";

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

export const ProductionTypeCreatingCard = () => {

    const { makeMutation } = useToastedMutation(ADD_PRODUCTION_TYPE, FETCH_PRODUCTION_TYPES, 'productionType')


    const createHandler = async (values) => {
        const variables = {
            productionType: values.productionType,
            description: values.description
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
                            productionType: '', description: ''
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.productionType) {
                                errors.productionType = 'error'
                            }
                            if (!values.description) {
                                errors.description = 'error'
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
                                        <Typography variant={'h4'}>Добавить тип изделия</Typography>
                                        <Container>
                                            <TextField
                                                error={touched.productionType && Boolean(errors.productionType)}
                                                label={'Название'}
                                                id="productionType"
                                                type="text"
                                                name="productionType"
                                                value={values.productionType}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <TextField
                                                error={touched.description && Boolean(errors.description)}
                                                label={'Описание'}
                                                id="description"
                                                type="text"
                                                name="description"
                                                value={values.description}
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