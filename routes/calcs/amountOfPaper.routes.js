const {Router} = require('express')
const validator = require('validator')
const Format = require('../../models/Format')
const Chromaticity = require('../../models/Chromaticity')
const {check, validationResult} = require('express-validator')
const router = Router()
const {actualSize, examFormatsAreas, sheetParts} = require('../../handleFunctions/calculateFunctions')

router.put('/amountofpaper', async (req, res) => {
    try {
        const {
            numberOfPages,
            numberOfCopies,
            isPageFormatManually,
            isPaperFormatManually,
            grainDirection,
            pageFormat,
            pageLongSideGrainDirection,
            newPageFormatHeight,
            newPageFormatWidth,
            paperFormat,
            newPaperFormatHeight,
            newPaperFormatWidth,
            paperLongSideGrainDirection,
            chromaticity
        } = req.body

        const pageSize = await actualSize(pageFormat, isPageFormatManually, newPageFormatHeight, newPageFormatWidth)
        const paperSize = await actualSize(paperFormat, isPaperFormatManually, newPaperFormatHeight, newPaperFormatWidth)
        const examSizes = examFormatsAreas(pageSize, paperSize)

        if (!examSizes) {
            return res.status(400).json({message: 'Формат страницы должен быть меньше формата бумаги.', pageSize, paperSize, examSizes})
        }

        const partsOfSheet = sheetParts(pageSize, paperSize, grainDirection, pageLongSideGrainDirection, paperLongSideGrainDirection)

        return res.status(200).json({message: 'Fine', pageSize, paperSize, examSizes, partsOfSheet})





        // if (!grainDirection) {                                                                                              /*Если направление волокон не важно, то...*/
        //
        // }

        /*Если направление волокон важно, то...*/

    } catch (e) {
        res.status(500).json({message: `Что-то пошло не так, попробуйте снова`})
    }
})

module.exports = router