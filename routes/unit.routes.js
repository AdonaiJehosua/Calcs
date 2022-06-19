const {Router} = require('express')
const Unit = require('../models/Unit')
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post(
    '/createunit', auth,
    [
        check('fullName', 'Введите полное название.').exists(),
        check('abbreviatedName', 'Введите сокращенное название.').exists(),
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
            const {fullName, abbreviatedName} = req.body

            const examinationFullName = await Unit.findOne({fullName})
            const examinationAbbreviatedName = await Unit.findOne({abbreviatedName})

            if (examinationFullName) {
                return res.status(400).json({message: 'Единица измерения с таким названием существует.'})
            }
            if (examinationAbbreviatedName) {
                return res.status(400).json({message: 'Единица измерения с таким названием существует.'})
            }

            const unit = new Unit({fullName, abbreviatedName})

            await unit.save()

            res.status(201).json({message: 'Единица измерения создана.'})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова.'})
        }
    }
)

router.delete('/:id', auth, async (req, res) => {
    try {
        await Unit.deleteOne({_id: req.params.id})
        res.status(201).json({message: 'Единица измерения удалена.'})
    } catch (e) {
        res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${req.params.id}`})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const units = await Unit.find()
        res.json(units)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router