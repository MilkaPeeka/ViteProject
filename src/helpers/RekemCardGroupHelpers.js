// a function that groups a list of rekems by makat
export const groupRekemsByMakat = (rekemList) => {
    // Use reduce to group objects based on their makat
    const groupedRekems = rekemList.reduce((result, rekem) => {
      const { makat } = rekem;
      if (!result[makat]) {
        result[makat] = []; // Initialize an empty array for the new makat group
      }
      result[makat].push(rekem); // Add the current rekem to the corresponding makat group
      return result;
    }, {});
  
    return groupedRekems;
  };


  export const countRekemValidAndInvalidByMakat = (rekemsGroupedByMakat) => {
    const result = [];
  
    for (const makat in rekemsGroupedByMakat) {
      const rekemList = rekemsGroupedByMakat[makat];
      let validCount = 0;
      let invalidCount = 0;
  
      for (const rekem of rekemList) {
        if (rekem.kshirot) {
          validCount++;
        } else {
          invalidCount++;
        }
      }
  
      result.push({
        valid: validCount,
        invalid: invalidCount,
        makat: makat,
      });
    }
  
    return result;
  };