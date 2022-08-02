const {Router} = require('express')
const Chromaticity = require('../../models/Chromaticity')
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth.middleware')
const validator = require("validator");
const router = Router()

router.post(
    '/createchromaticity', auth,
    [
        check('front', 'Введите цветность лицевой стороны.').exists(),
        check('back', 'Введите цветность оборотной стороны.').exists(),
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
            const {front, back} = req.body
            const name = `${front} + ${back}`

            const examinationChromaticity = await Chromaticity.findOne({front, back})

            if (examinationChromaticity) {
                return res.status(400).json({message: 'Такая цветность существует.'})
            }

            const isOnePrintSide = Boolean(back === 0)

            const chromaticity = new Chromaticity({front, back, name, isOnePrintSide})

            await chromaticity.save()

            res.status(201).json({message: 'Цветность создана.'})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова.'})
        }
    }
)

router.delete('/:id', auth, async (req, res) => {
    try {
        await Chromaticity.deleteOne({_id: req.params.id})
        res.status(201).json({message: 'Цветность удалена.'})
    } catch (e) {
        res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${req.params.id}`})
    }
})

router.put('/:id/changeentryvalue', auth,

    async (req, res) => {
        try {

            const {updatingValue} = req.body
            const oldValues = await Chromaticity.findOne({_id: req.params.id})

            switch (req.body.entryKey) {
                case 'front':
                    if (validator.isEmpty(String(updatingValue))) {
                        return (res.status(400).json({message: `Введите цветность лицевой стороны`}))
                    }

                    if (!validator.isNumeric(String(updatingValue))) {
                        return res.status(400).json({message: `Цветность лицевой стороны должна быть числом`})
                    }

                    if (validator.equals(String(updatingValue), '0')) {
                        return res.status(400).json({message: `Цветность лицевой не может быть нулем`})
                    }

                    const examinationFrontValues = await Chromaticity.findOne({front: updatingValue, back: oldValues.back})
                    if (examinationFrontValues) {
                        return res.status(400).json({message: `Цветность с такими значениями существует`})
                    }

                    await Chromaticity.updateOne({_id: req.params.id}, {$set: {front : updatingValue}})
                    res.status(201).json({message: 'Цветность лицевой стороны изменена.', updatedValue: updatingValue})

                    break

                case 'back':
                    if (validator.isEmpty(String(updatingValue))) {
                        return (res.status(400).json({message: `Введите цветность оборотной стороны`}))
                    }

                    if (!validator.isNumeric(String(updatingValue))) {
                        return res.status(400).json({message: `Цветность оборотной стороны должна быть числом`})
                    }
                    const examinationBackValues = await Chromaticity.findOne({front: oldValues.front, back: updatingValue})
                    if (examinationBackValues) {
                        return res.status(400).json({message: `Цветность с такими значениями существует`})
                    }

                    await Chromaticity.updateOne({_id: req.params.id}, {$set: {back : updatingValue}})
                    res.status(201).json({message: 'Цветность оборота изменена.', updatedValue: updatingValue})

                    break

            }


        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова`})
        }
    })

router.get('/', auth, async (req, res) => {
    try {
        const chromaticities = await Chromaticity.find()
        res.json(chromaticities)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router