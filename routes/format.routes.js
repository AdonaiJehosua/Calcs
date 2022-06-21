const {Router} = require('express')
const validator = require('validator')
const Format = require('../models/Format')
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post(
    '/createformat', auth,
    [
        check('formatName', 'Введите название.').exists({checkFalsy: true}),
        check('dimensions.height', 'Высота должна быть числом.').isNumeric(),
        check('dimensions.width', 'Ширина должна быть числом.').isNumeric(),
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

            const format = new Format({formatName, dimensions})

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

        switch (updatingValue.entryKey) {
            case 'formatName':
               if (validator.isEmpty(updatingValue)) {
                return (res.status(400).json({message: `Введите название формата`}))
            }

                const examinationName = await Format.findOne({formatName: updatingValue})
                if (examinationName) {
                    return res.status(400).json({message: `Формат с таким названием существует - ${updatingValue}`})
                }

                await Format.updateOne({_id: req.params.id}, {$set: {formatName : updatingValue}})
                res.status(201).json({message: 'Название формата изменено.', updatedValue: updatingValue})

                break

            case 'height':
                if (validator.isEmpty(String(updatingValue))) {
                    return res.status(400).json({message: `Введите высоту`})
                }
                if (!validator.isNumeric(String(updatingValue))) {
                    return res.status(400).json({message: `Высота должна быть числом`})
                }

                const oldFormatHeight = await Format.findOne({_id: req.params.id})
                const newHeightDimensions = {height: Number(updatingValue), width: oldFormatHeight.dimensions.width}
                const examinationNewHeightDim = await Format.findOne({dimensions: newHeightDimensions})

                if (examinationNewHeightDim) {
                    return res.status(400).json({message: `Формат с такими значениями существует`})
                }
                await Format.updateOne({_id: req.params.id}, {$set: {dimensions : newHeightDimensions}})
                res.status(201).json({message: 'Высота изменена.', updatedValue: updatingValue})

                break

            case 'width':
                if (validator.isEmpty(String(updatingValue))) {
                    return res.status(400).json({message: `Введите ширину`})
                }
                if (!validator.isNumeric(String(updatingValue))) {
                    return res.status(400).json({message: `Ширина должна быть числом`})
                }

                const oldFormatWidth = await Format.findOne({_id: req.params.id})
                const newWidthDimensions = {height: oldFormatWidth.dimensions.height, width: Number(updatingValue)}
                const examinationNewWidthDim = await Format.findOne({dimensions: newWidthDimensions})

                if (examinationNewWidthDim) {
                    return res.status(400).json({message: `Формат с такими значениями существует`})
                }
                await Format.updateOne({_id: req.params.id}, {$set: {dimensions : newWidthDimensions}})
                res.status(201).json({message: 'Ширина изменена.', updatedValue: updatingValue})

                break

        }


    } catch (e) {
        res.status(500).json({message: `Что-то пошло не так, попробуйте снова`})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const formats = await Format.find()
        res.json(formats)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router