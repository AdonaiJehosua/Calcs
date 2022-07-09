import * as Yup from 'yup';
import {Form, Formik} from "formik";
import {Button, Card, CardActions, CardContent, Container, TextField, Typography} from "@mui/material";
import {SelectComponent} from "../../../../components/SelectComponent";
import {SwitchComponent} from "../../../../components/SwitchComponent";
import Box from "@mui/material/Box";


export const AmountOfPaper = () => {

    const initialValues = {
        numberOfPages: '',
        numberOfCopies: '',
        grainDirection: false,
        pageFormat: '',
        portraitPageFormat: false,
        newPageFormatHeight: '',
        newPageFormatWidth: '',
        paperFormat: '',
        newPaperFormatHeight: '',
        newPaperFormatWidth: '',
        portraitPaperFormat: false,
        chromaticity: '',
    }

    const calcSchema = Yup.object().shape({
        numberOfPages: Yup.number()
            .moreThan(0, 'Не может быть меньше ноля')
            .required('Введите количество страниц'),
        numberOfCopies: Yup.number()
            .moreThan(0, 'Не может быть меньше ноля')
            .required('Введите тираж'),
        pageFormat: Yup.string()
            .required('Выберите формат издания'),
        newPageFormatHeight: Yup.number()
            .when('pageFormat',
                {
                    is: 'Ввести вручную', then: Yup.number()
                        .moreThan(0, 'Не может быть меньше ноля')
                        .required('Введите высоту страницы')
                }),
        newPageFormatWidth: Yup.number()
            .when('pageFormat',
                {
                    is: 'Ввести вручную', then: Yup.number()
                        .moreThan(0, 'Не может быть меньше ноля')
                        .required('Введите ширину страницы')
                }),
        paperFormat: Yup.string()
            .required('Выберите формат бумаги'),
        newPaperFormatHeight: Yup.number()
            .when('paperFormat',
                {
                    is: 'Ввести вручную', then: Yup.number()
                        .moreThan(0, 'Не может быть меньше ноля')
                        .required('Введите высоту бумаги')
                }),
        newPaperFormatWidth: Yup.number()
            .when('paperFormat',
                {
                    is: 'Ввести вручную', then: Yup.number()
                        .moreThan(0, 'Не может быть меньше ноля')
                        .required('Введите ширину бумаги')
                }),
        chromaticity: Yup.string()
            .required('Выберите цветность'),
    })


    const calcHandler = (values, actions) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
        }, 1000);
    }


    return (
        <>
            <Formik
                onSubmit={calcHandler}
                initialValues={initialValues}
                validationSchema={calcSchema}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      isSubmitting,
                      handleReset
                  }) => (
                    <Form>
                        <Card>
                            <CardContent>
                                <Typography variant={'h4'}>Количество бумаги на тираж</Typography>
                                <Container>
                                    <TextField
                                        error={touched.numberOfPages && Boolean(errors.numberOfPages)}
                                        helperText={touched.numberOfPages && errors.numberOfPages}
                                        label={'Количество страниц'}
                                        type="number"
                                        name="numberOfPages"
                                        value={values.numberOfPages}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        error={touched.numberOfCopies && Boolean(errors.numberOfCopies)}
                                        helperText={touched.numberOfCopies && errors.numberOfCopies}
                                        label={'Тираж'}
                                        type="number"
                                        name="numberOfCopies"
                                        value={values.numberOfCopies}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <SwitchComponent values={values}
                                                  label={'Долевая важна'}
                                                  handleChange={handleChange}
                                                  errors={errors}
                                                  name={'grainDirection'}
                                                  handleBlur={handleBlur}
                                                  touched={touched}
                                                  checked={values.grainDirection}/>

                                    <SelectComponent
                                        addItem={'Ввести вручную'}
                                        values={values}
                                        label={'Формат страниц'}
                                        handleChange={handleChange}
                                        errors={errors}
                                        initialKey={'pageFormat'}
                                        handleBlur={handleBlur}
                                        nameKey={'formatName'}
                                        touched={touched}
                                        endpoint={'format'}/>

                                    {(values.pageFormat === 'Ввести вручную') && (
                                        <Box>
                                            <TextField
                                                error={touched.newPageFormatHeight && Boolean(errors.newPageFormatHeight)}
                                                helperText={touched.newPageFormatHeight && errors.newPageFormatHeight}
                                                label={'Высота страницы'}
                                                type="number"
                                                name="newPageFormatHeight"
                                                value={values.newPageFormatHeight}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <TextField
                                                error={touched.newPageFormatWidth && Boolean(errors.newPageFormatWidth)}
                                                helperText={touched.newPageFormatWidth && errors.newPageFormatWidth}
                                                label={'Ширина страницы'}
                                                type="number"
                                                name="newPageFormatWidth"
                                                value={values.newPageFormatWidth}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Box>)
                                    }

                                    {values.grainDirection && <SwitchComponent label={'Ориентация издания'}
                                                                            handleChange={handleChange}
                                                                            errors={errors}
                                                                            name={'portraitPageFormat'}
                                                                            handleBlur={handleBlur}
                                                                            touched={touched}
                                                                            checked={values.portraitPageFormat}/>
                                    }

                                    <SelectComponent values={values}
                                                     addItem={'Ввести вручную'}
                                                     label={'Формат бумаги'}
                                                     handleChange={handleChange}
                                                     errors={errors}
                                                     initialKey={'paperFormat'}
                                                     handleBlur={handleBlur}
                                                     nameKey={'formatName'}
                                                     touched={touched}
                                                     endpoint={'format'}/>
                                    {(values.paperFormat === 'Ввести вручную') && (
                                        <Box>
                                            <TextField
                                                error={touched.newPaperFormatHeight && Boolean(errors.newPaperFormatHeight)}
                                                helperText={touched.newPaperFormatHeight && errors.newPaperFormatHeight}
                                                label={'Высота листа бумаги'}
                                                type="number"
                                                name="newPaperFormatHeight"
                                                value={values.newPaperFormatHeight}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <TextField
                                                error={touched.newPaperFormatWidth && Boolean(errors.newPaperFormatWidth)}
                                                helperText={touched.newPaperFormatWidth && errors.newPaperFormatWidth}
                                                label={'Ширина листа бумаги'}
                                                type="number"
                                                name="newPaperFormatWidth"
                                                value={values.newPaperFormatWidth}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Box>)
                                    }
                                    {values.grainDirection && <SwitchComponent label={'Ориентация бумаги'}
                                                                            handleChange={handleChange}
                                                                            errors={errors}
                                                                            name={'portraitPaperFormat'}
                                                                            handleBlur={handleBlur}
                                                                            touched={touched}
                                                                            checked={values.portraitPaperFormat}/>
                                    }
                                    <SelectComponent values={values}
                                                     label={'Цветность'}
                                                     handleChange={handleChange}
                                                     errors={errors}
                                                     initialKey={'chromaticity'}
                                                     handleBlur={handleBlur}
                                                     nameKey={'name'}
                                                     touched={touched}
                                                     endpoint={'chromaticity'}/>


                                </Container>
                            </CardContent>
                            <CardActions>
                                <Button variant={'contained'} type={'submit'} disabled={isSubmitting}>Посчитать</Button>
                                <Button variant={'outlined'} type={'button'} onClick={handleReset} disabled={isSubmitting}>Очистить</Button>
                            </CardActions>
                        </Card>
                    </Form>
                )}
            </Formik>
        </>
    )
}