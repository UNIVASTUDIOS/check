import  diagonalDictionaryTLBR from '../dictionaries/diagonalTopLeftBottomRight.json';
import  diagonalDictionaryTRBL from '../dictionaries/diagonalTopRightBottomLeft.json';
import  rowDictionary from '../dictionaries/row.json';
import  columnDictionary from '../dictionaries/column.json';

export const isSameRow = (src, dest) => {
  return !!(rowDictionary[src] && rowDictionary[src][dest]);
}

export const isSameColumn = (src, dest) => {
  return !!(columnDictionary[src] && columnDictionary[src][dest]);
}

export const isSameDiagonal = (src, dest) => {
  return !!((diagonalDictionaryTLBR[src] && diagonalDictionaryTLBR[src][dest]) ||
    (diagonalDictionaryTRBL[src] && diagonalDictionaryTRBL[src][dest]))
}

export const isPathClean = (srcToDestPath, squares) => {
    // console.log("ckecking for clean path");

    const isItClean = srcToDestPath.reduce((acc, curr) => {
        const isBool = !squares[curr] && acc

        // console.log(squares);

        return isBool;
    }, true)

    // console.log("Is Path clean: ", isItClean);

    return isItClean;
}


// module.exports = {
//   isSameRow,
//   isSameColumn,
//   isSameDiagonal,
//   isPathClean
// }