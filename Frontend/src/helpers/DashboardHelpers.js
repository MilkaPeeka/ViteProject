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



// a function to count valid and invalid rekems by their makat
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


// transorms a list of {makat, valid, invalid} into {label: makat, value: valids in precentages out of total}
export const transformRekemDataToPercentages = (data) => {
  const totalRekems = data.reduce((total, item) => total + item.valid + item.invalid, 0);

  const transformedData = data.map((item) => ({
    label: item.makat,
    value: Math.round((item.valid / (item.valid + item.invalid)) * 100),
  }));

  return transformedData;
};

// gets a an untouched list of rekems and returns the count of valid and invalid
export const countRekemValidAndInvalid = (rekemList) => {
  const initialCount = { valid: 0, invalid: 0 };

  const totalCount = rekemList.reduce((count, rekem) => {
    if (rekem.kshirot) {
      count.valid++;
    } else {
      count.invalid++;
    }
    return count;
  }, initialCount);

  return totalCount;
};