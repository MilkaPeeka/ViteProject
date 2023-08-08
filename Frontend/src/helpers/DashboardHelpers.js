// transorms a list of {makat, valid, invalid} into {label: makat, value: valids in precentages out of total}
export const transformRekemDataToPercentages = (summarizedRekemList) => {

  const transformedData = summarizedRekemList.map((item) => ({
    label: item.makat,
    value: Math.round((item.valid / (item.valid + item.invalid)) * 100),
  }));

  return transformedData;
};

// gets a list of rekems and returns the count of valid and invalid
export const countRekemValidAndInvalid = (summarizedRekemList) => {
  let valid = 0;
  let invalid = 0;

  for (const item of summarizedRekemList) {
    valid += item.valid;
    invalid += item.invalid;
  }

  return { valid, invalid };
};


// gets an untouched list of rekems and filters the one with the best valid to invalid ratio
export const getBestValidInvalidRatioRekem = (summarizedRekemList) => {
  let bestRatio = 0;
  let bestItem = {
    makat: 0,
    valid: 0,
    invalid: 0
  };

  for (const item of summarizedRekemList) {
    const validCount = item.valid;
    const invalidCount = item.invalid;

    // Calculate valid-to-invalid ratio
    const ratio = validCount / (validCount + invalidCount);

    // Update bestRatio and bestItem if the current ratio is better
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestItem = item;
    }
  }

  return bestItem;
};

// gets an untouched list of rekems and filters the one with the best valid to invalid ratio
export const getWorstValidInvalidRatioRekem = (summarizedRekemList) => {
  let bestRatio = 100;
  let bestItem = {
    makat: 0,
    valid: 0,
    invalid: 0
  };

  for (const item of summarizedRekemList) {
    const validCount = item.valid;
    const invalidCount = item.invalid;

    // Calculate valid-to-invalid ratio
    const ratio = validCount / (validCount + invalidCount);

    // Update bestRatio and bestItem if the current ratio is better
    if (ratio < bestRatio) {
      bestRatio = ratio;
      bestItem = item;
    }
  }

  return bestItem;
};