const Format = require("../models/Format");

                                                                                                                        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
module.exports.actualSize = async function (format, manually, newFormatHeight, newFormatWidth) {                        /*  Функция возвращает размеры изделия в зависимости от:                                                         */
    if (manually) {                                                                                                     /*   format - id формата, выбранного пользователем;                                                              */
        return {height: newFormatHeight, width: newFormatWidth}                                                         /*   manually - true, если пользователь выбрал ручной ввод значений; false, если выбрал формат из предложенных;  */
    }                                                                                                                   /*   newFormatHeight и newFormatWidth - введенные пользователем длина и ширина, соответственно.                  */
    const actualFormat = await Format.findOne({_id: format})                                                       /*  Если пользователь выбрал ручной ввод размеров, то эти размеры и вернутся, если выбрал формат из базы,        */
    return {height: Number(actualFormat.dimensions.height), width: Number(actualFormat.dimensions.width)}               /*  то этот формат будет найден по id, и функция вернет значения его размеров.                                   */
}                                                                                                                       /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

module.exports.examFormatsAreas = function (lesserFormat, largerFormat) {                                               /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    return Boolean((lesserFormat.height * lesserFormat.width) < (largerFormat.height * largerFormat.width))       /*   Функция возвращает true, если формат, который должен быть меньше, действительно меньше формата, который должен быть больше.   */
}                                                                                                                       /*   lesserFormat - формат, который должен быть меньше. largerFormat - формат, который должен быть больше.                         */
                                                                                                                        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

module.exports.sheetParts = function (lesserFormat,
                                      largerFormat,
                                      grainDirection = false,
                                      isLesserFormatLongSideGrainDirection,
                                      isLargerFormatLongSideGrainDirection) {
    switch (grainDirection) {
        case false:
            if (Math.floor(largerFormat.height / lesserFormat.height) >=
                Math.floor(largerFormat.width / lesserFormat.height)) {
                return (Math.floor(largerFormat.height / lesserFormat.height) *
                    Math.floor(largerFormat.width / lesserFormat.width))
            }
            return (Math.floor(largerFormat.width / lesserFormat.height) *
                Math.floor(largerFormat.height / lesserFormat.width))

        case true:
            const examGrainDirectionMatches = Boolean(isLesserFormatLongSideGrainDirection ===
                isLargerFormatLongSideGrainDirection)

            if (examGrainDirectionMatches === true) {
                return (Math.floor(largerFormat.height / lesserFormat.height) *
                    Math.floor(largerFormat.width / lesserFormat.width))
            }
            return (Math.floor(largerFormat.height / lesserFormat.width) *
                Math.floor(largerFormat.width / lesserFormat.height))
    }
}