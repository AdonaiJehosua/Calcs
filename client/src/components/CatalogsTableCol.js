import {useState} from "react";
import {Formik, Form} from "formik";
import validator from "validator";
import {Button, Card, CardActions, CardContent, Popover, TableCell, TextField, Typography} from "@mui/material";
import {useToastedMutation} from "../hooks/toastedMutation.hook";

export const CatalogsTableCol = ({value, inputType, entryId, entryKey, updateMutation, fetchQuery}) => {

    const [editMode, setEditMode] = useState(false)
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleDoubleClick = async () => {
        await activateEditMode()
        let selectedText = document.getElementById('updatingValue')
        selectedText.select()
    }

    const {makeMutation} = useToastedMutation(updateMutation, fetchQuery)

    const updateHandler = async (values) => {
        const variables = {
            id: entryId,
            entryKey: entryKey,
            updatingValue: values.updatingValue
        }
        await makeMutation(variables, values)
        await handleClose()
        await deactivateEditMode()
    }

    return (
        <TableCell align={'center'}>
            <Formik
                onSubmit={updateHandler}
                initialValues={{
                    updatingValue: value
                }}
                validate={values => {
                    const errors = {};
                    if (validator.isEmpty(String(values.updatingValue))) {
                        errors.updatingValue = 'Введите данные'
                    }
                    return errors
                }}
            >
                {({
                      values,
                      handleChange,
                      handleBlur,
                      errors,
                      touched,
                      isSubmitting,
                      handleSubmit
                  }) => (
                    <Form>
                        {!editMode && <span onDoubleClick={handleDoubleClick}>{value}</span>}
                        {editMode &&
                        <div>
                            <TextField
                                error={touched.updatingValue && Boolean(errors.updatingValue)}
                                helperText={touched.updatingValue && errors.updatingValue}
                                id="updatingValue"
                                type={inputType}
                                name="updatingValue"
                                value={values.updatingValue}
                                autoFocus={true}
                                onBlur={handleBlur}
                                onChange={handleChange}/>

                            <Button aria-describedby={id} variant={'contained'} onClick={handleClick}>
                                Изменить
                            </Button>

                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}>
                                <Card>
                                    <CardContent>
                                        <Typography sx={{fontSize: 14}}>Опасность!!!</Typography>
                                        <Typography>
                                            Вы уверены, что хотите изменить?
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            variant={'contained'}
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                        >
                                            Уверен
                                        </Button>
                                        <Button variant={'outlined'} onClick={handleClose}>Отмена
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Popover>
                            <Button variant={'outlined'} onClick={deactivateEditMode}>Отмена</Button>
                        </div>}
                    </Form>
                )}
            </Formik>
        </TableCell>
    )
}