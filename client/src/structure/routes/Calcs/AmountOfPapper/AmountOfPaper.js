import * as Yup from 'yup';
import {Form, Formik} from "formik";
import {Button, Card, CardActions, CardContent, Container, TextField, Typography} from "@mui/material";
import {SelectComponent} from "../../../../components/SelectComponent";
import {SwitchComponent} from "../../../../components/SwitchComponent";
import Box from "@mui/material/Box";
import {useHttp} from "../../../../hooks/http.hook";
import 'react-toastify/dist/ReactToastify.css';


export const AmountOfPaper = () => {

    const {request} = useHttp()

    const initialValues = {
        numberOfPages: '',
        numberOfCopies: '',
        grainDirection: false,
        pageFormat: '',
        pageLongSideGrainDirection: true,
        newPageLongSide: '',
        newPageShortSide: '',
        paperFormat: '',
        newPaperLongSide: '',
        newPaperShortSide: '',
        paperLongSideGrainDirection: true,
        isOnePrintSide: undefined,
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
        newPageLongSide: Yup.number()
            .when('pageFormat',
                {
                    is: 'manually', then: Yup.number()
                        .moreThan(0, 'Не может быть меньше ноля')
                        .required('Введите значение длинной стороны страницы')
                }),
        newPageShortSide: Yup.number()
            .when('pageFormat',
                {
                    is: 'manually', then: Yup.number()
                        .moreThan(0, 'Не может быть меньше ноля')
                        .required('Введите значение короткой стороны страницы')
                }),
        paperFormat: Yup.string()
            .required('Выберите формат бумаги'),
        newPaperLongSide: Yup.number()
            .when('paperFormat',
                {
                    is: 'manually', then: Yup.number()
                        .moreThan(0, 'Не может быть меньше ноля')
                        .required('Введите значение длинной стороны бумаги')
                }),
        newPaperShortSide: Yup.number()
            .when('paperFormat',
                {
                    is: 'manually', then: Yup.number()
                        .moreThan(0, 'Не может быть меньше ноля')
                        .required('Введите значение короткой стороны бумаги')
                }),
        isOnePrintSide: Yup.boolean()
            .required('Выберите цветность'),
    })


    const calcHandler = async (values) => {
        const isPageFormatManually = Boolean(values.pageFormat === 'manually')
        const isPaperFormatManually = Boolean(values.paperFormat === 'manually')

        try {
            await request(
                '/api/calcs/amountofpaper',
                'PUT',
                {...values, isPageFormatManually, isPaperFormatManually}
            )
        } catch (e) {
        }
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
                                        addItemName={'Ввести вручную'}
                                        addItemValue={'manually'}
                                        values={values}
                                        label={'Формат страниц'}
                                        handleChange={handleChange}
                                        postedValue={'_id'}
                                        errors={errors}
                                        initialKey={'pageFormat'}
                                        handleBlur={handleBlur}
                                        nameKey={'formatName'}
                                        touched={touched}
                                        endpoint={'format'}/>
                                    {(values.pageFormat === 'manually') && (
                                        <Box>
                                            <TextField
                                                error={touched.newPageLongSide && Boolean(errors.newPageLongSide)}
                                                helperText={touched.newPageLongSide && errors.newPageLongSide}
                                                label={'Длинная сторона страницы'}
                                                type="number"
                                                name="newPageLongSide"
                                                value={values.newPageLongSide}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <TextField
                                                error={touched.newPageShortSide && Boolean(errors.newPageShortSide)}
                                                helperText={touched.newPageShortSide && errors.newPageShortSide}
                                                label={'Короткая сторона страницы'}
                                                type="number"
                                                name="newPageShortSide"
                                                value={values.newPageShortSide}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Box>)
                                    }

                                    {values.grainDirection && <SwitchComponent label={'Ориентация издания'}
                                                                               handleChange={handleChange}
                                                                               errors={errors}
                                                                               name={'pageLongSideGrainDirection'}
                                                                               handleBlur={handleBlur}
                                                                               touched={touched}
                                                                               checked={values.pageLongSideGrainDirection}/>
                                    }
                                    <SelectComponent values={values}
                                                     addItemName={'Ввести вручную'}
                                                     addItemValue={'manually'}
                                                     label={'Формат бумаги'}
                                                     handleChange={handleChange}
                                                     errors={errors}
                                                     postedValue={'_id'}
                                                     initialKey={'paperFormat'}
                                                     handleBlur={handleBlur}
                                                     nameKey={'formatName'}
                                                     touched={touched}
                                                     endpoint={'format'}/>
                                    {(values.paperFormat === 'manually') && (
                                        <Box>
                                            <TextField
                                                error={touched.newPaperLongSide && Boolean(errors.newPaperLongSide)}
                                                helperText={touched.newPaperLongSide && errors.newPaperLongSide}
                                                label={'Длинная сторона листа бумаги'}
                                                type="number"
                                                name="newPaperLongSide"
                                                value={values.newPaperLongSide}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <TextField
                                                error={touched.newPaperShortSide && Boolean(errors.newPaperShortSide)}
                                                helperText={touched.newPaperShortSide && errors.newPaperShortSide}
                                                label={'Короткая сторона листа бумаги'}
                                                type="number"
                                                name="newPaperShortSide"
                                                value={values.newPaperShortSide}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Box>)
                                    }
                                    {values.grainDirection && <SwitchComponent label={'Ориентация бумаги'}
                                                                               handleChange={handleChange}
                                                                               errors={errors}
                                                                               name={'paperLongSideGrainDirection'}
                                                                               handleBlur={handleBlur}
                                                                               touched={touched}
                                                                               checked={values.paperLongSideGrainDirection}/>
                                    }
                                    <SelectComponent values={values}
                                                     label={'Цветность'}
                                                     handleChange={handleChange}
                                                     errors={errors}
                                                     initialKey={'isOnePrintSide'}
                                                     handleBlur={handleBlur}
                                                     postedValue={'isOnePrintSide'}
                                                     nameKey={'name'}
                                                     touched={touched}
                                                     endpoint={'chromaticity'}/>
                                </Container>
                            </CardContent>
                            <CardActions>
                                <Button variant={'contained'} type={'submit'} disabled={isSubmitting}>Посчитать</Button>
                                <Button variant={'outlined'} type={'button'} onClick={handleReset}
                                        disabled={isSubmitting}>Очистить</Button>
                            </CardActions>
                        </Card>
                    </Form>
                )}
            </Formik>
        </>
    )
}