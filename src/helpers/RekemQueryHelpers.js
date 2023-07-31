
/*
Gets a rekem list, counts the valid and invalid rekems of the same makat and returns the data
*/
export const reduceRekemListIntoData = (rekemsList, rekemMakat) => {
    const allRekemsWithSameMakat = rekemsList.filter(rakam => rakam.makat === rekemMakat);
    if (allRekemsWithSameMakat.length === 0){
        return {
            isRekemFound: false
        };
    }

    const validRekemsLength = allRekemsWithSameMakat.filter(foundRekem => foundRekem.kshirot).length;
    return {
        isRekemFound: true,
        rekemData: {
            valid: validRekemsLength,
            invalid: allRekemsWithSameMakat.length - validRekemsLength 
        }
    };
}