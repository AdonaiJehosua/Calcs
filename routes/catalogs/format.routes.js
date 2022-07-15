const {Router} = require('express')
const validator = require('validator')
const Format = require('../../models/Format')
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth.middleware')
const router = Router()

router.post(
    '/createformat', auth,
    [
        check('formatName', 'Введите название.').exists({checkFalsy: true}),
        check('dimensions.longSide', 'Значение должно быть числом.').isNumeric(),
        check('dimensions.shortSide', 'Значение должно быть числом.').isNumeric(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные.'
                })
            }
            const {formatName, dimensions} = req.body

            const examinationName = await Format.findOne({formatName})
            const examinationDim = await Format.findOne({dimensions})

            if (examinationName) {
                return res.status(400).json({message: 'Формат с таким названием существует.'})
            }
            if (examinationDim) {
                return res.status(400).json({message: `Формат с такими значениями существует - "${examinationDim.formatName}"`})
            }

            const area = dimensions.longSide * dimensions.shortSide

            const format = new Format({formatName, dimensions, area})

            await format.save()

            res.status(201).json({message: 'Формат создан.'})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова.'})
        }
    }
)

router.delete('/:id', auth, async (req, res) => {
    try {
        await Format.deleteOne({_id: req.params.id})
        res.status(201).json({message: 'Формат удален.'})
    } catch (e) {
        res.status(500).json({message: `Что-то пошло не так, попробуйте снова`})
    }
})

router.put('/:id/changeentryvalue', auth,

    async (req, res) => {
    try {

        const {updatingValue} = req.body

        switch (req.body.entryKey) {
            case 'formatName':
               if (validator.isEmpty(updatingValue)) {
                return (res.status(400).json({message: `Введите название формата.`}))
            }

                const examinationName = await Format.findOne({formatName: updatingValue})
                if (examinationName) {
                    return res.status(400).json({message: `Формат с таким названием существует - ${updatingValue}`})
                }

                await Format.updateOne({_id: req.params.id}, {$set: {formatName : updatingValue}})
                res.status(201).json({message: 'Название формата изменено.', updatedValue: updatingValue})

                break

            case 'longSide':
                if (validator.isEmpty(String(updatingValue))) {
                    return res.status(400).json({message: `Введите значение длинной стороны.`})
                }
                if (!validator.isNumeric(String(updatingValue))) {
                    return res.status(400).json({message: `Значение должно быть числом.`})
                }

                const oldFormatLongSide = await Format.findOne({_id: req.params.id})
                const newLongSideDimensions = {longSide: Number(updatingValue), shortSide: oldFormatLongSide.dimensions.shortSide}
                const examinationNewLongSideDim = await Format.findOne({dimensions: newLongSideDimensions})

                if (examinationNewLongSideDim) {
                    return res.status(400).json({message: `Формат с такими значениями существует.`})
                }

                const newLongSideArea = newLongSideDimensions.longSide * newLongSideDimensions.shortSide

                await Format.updateOne({_id: req.params.id}, {$set: {dimensions : newLongSideDimensions, area: newLongSideArea}})
                res.status(201).json({message: 'Значение изменено.', updatedValue: updatingValue})

                break

            case 'shortSide':
                if (validator.isEmpty(String(updatingValue))) {
                    return res.status(400).json({message: `Введите значение короткой стороны.`})
                }
                if (!validator.isNumeric(String(updatingValue))) {
                    return res.status(400).json({message: `Значение должно быть числом.`})
                }

                const oldFormatShortSide = await Format.findOne({_id: req.params.id})
                const newShortSideDimensions = {height: oldFormatShortSide.dimensions.longSide, shortSide: Number(updatingValue)}
                const examinationNewShortSideDim = await Format.findOne({dimensions: newShortSideDimensions})

                if (examinationNewShortSideDim) {
                    return res.status(400).json({message: `Формат с такими значениями существует.`})
                }

                const newShortSideArea = newShortSideDimensions.longSide * newShortSideDimensions.shortSide

                await Format.updateOne({_id: req.params.id}, {$set: {dimensions : newShortSideDimensions, area : newShortSideArea}})
                res.status(201).json({message: 'Значение изменено.', updatedValue: updatingValue})

                break

        }


    } catch (e) {
        res.status(500).json({message: `Что-то пошло не так, попробуйте снова.`})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const formats = await Format.find()
        res.json(formats)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова.'})
    }
})

module.exports = router