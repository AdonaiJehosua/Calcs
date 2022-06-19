export const calculateNumberOfSheets = (numberOfEditionSheets, numberOfCopies, editionWidth, editionHeight, paperWidth, paperHeight) => {
    let result = numberOfEditionSheets / ((paperWidth / editionWidth) * (paperHeight / editionHeight)) * numberOfCopies
    return result
}