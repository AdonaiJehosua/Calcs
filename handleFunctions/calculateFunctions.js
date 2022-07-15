const Format = require("../models/Format");

                                                                                                                        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
module.exports.actualSize = async function (format, manually, newFormatHeight, newFormatWidth) {                        /*  Функция возвращает размеры изделия в зависимости от:                                                         */
    if (manually) {                                                                                                     /*   format - id формата, выбранного пользователем;                                                              */
        return {longSide: newFormatHeight, shortSide: newFormatWidth}                                                   /*   manually - true, если пользователь выбрал ручной ввод значений; false, если выбрал формат из предложенных;  */
    }                                                                                                                   /*   newFormatHeight и newFormatWidth - введенные пользователем длина и ширина, соответственно.                  */
    const actualFormat = await Format.findOne({_id: format})                                                       /*  Если пользователь выбрал ручной ввод размеров, то эти размеры и вернутся, если выбрал формат из базы,        */
    return {longSide: Number(actualFormat.dimensions.longSide), shortSide: Number(actualFormat.dimensions.shortSide)}   /*  то этот формат будет найден по id, и функция вернет значения его размеров.                                   */
}                                                                                                                       /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

module.exports.examFormatsAreas = function (lesserFormat, largerFormat) {                                               /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    return Boolean((lesserFormat.longSide * lesserFormat.shortSide) <                                             /*   Функция возвращает true, если формат, который должен быть меньше, действительно меньше формата, который должен быть больше.   */
        (largerFormat.longSide * largerFormat.shortSide))                                                               /*   lesserFormat - формат, который должен быть меньше. largerFormat - формат, который должен быть больше.                         */
}                                                                                                                       /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


module.exports.sheetParts = function (lesserFormat,
                                      largerFormat,
                                      grainDirection = false,
                                      isLesserFormatLongSideGrainDirection,
                                      isLargerFormatLongSideGrainDirection) {
    switch (grainDirection) {
        case false:
            if (Math.floor(largerFormat.longSide / lesserFormat.longSide) >=
                Math.floor(largerFormat.shortSide / lesserFormat.longSide)) {
                return (Math.floor(largerFormat.longSide / lesserFormat.longSide) *
                    Math.floor(largerFormat.shortSide / lesserFormat.shortSide))
            }
            return (Math.floor(largerFormat.shortSide / lesserFormat.longSide) *
                Math.floor(largerFormat.longSide / lesserFormat.shortSide))

        case true:
            const examGrainDirectionMatches = Boolean(isLesserFormatLongSideGrainDirection ===
                isLargerFormatLongSideGrainDirection)

            if (examGrainDirectionMatches === true) {
                return (Math.floor(largerFormat.longSide / lesserFormat.longSide) *
                    Math.floor(largerFormat.shortSide / lesserFormat.shortSide))
            }
            return (Math.floor(largerFormat.longSide / lesserFormat.shortSide) *
                Math.floor(largerFormat.shortSide / lesserFormat.longSide))
    }
}