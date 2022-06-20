const {Router} = require('express')
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

    [
        check('updatingValue', 'Введите название.').exists({checkFalsy: true}),
    ],
    async (req, res) => {
    try {

        if (req.body.entryKey === 'formatName') {check('updatingValue', 'Введите название.').exists({checkFalsy: true})}
        if (req.body.entryKey === 'height' || 'width') {check('updatingValue', 'Должно быть указано число').isNumeric()}

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные.'
            })
        }

        const {updatingValue} = req.body

        const examinationName = await Format.findOne({formatName: updatingValue})

        if (examinationName) {
            return res.status(400).json({message: `Формат с таким названием существует - ${req.body.updatingValue}`})
        }

        await Format.updateOne({_id: req.params.id}, {$set: {formatName : req.body.updatingValue}})
        res.status(201).json({message: 'Название формата изменено.', updatedValue: req.body.updatingValue})
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