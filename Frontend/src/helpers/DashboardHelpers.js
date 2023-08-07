// transorms a list of {makat, valid, invalid} into {label: makat, value: valids in precentages out of total}
export const transformRekemDataToPercentages = (summarizedRekemList) => {

  const transformedData = summarizedRekemList.map((item) => ({
    label: item.makat,
    value: Math.round((item.valid / (item.valid + item.invalid)) * 100),
  }));

  return transformedData;
};

// gets a an untouched list of rekems and returns the count of valid and invalid
export const countRekemValidAndInvalid = (summarizedRekemList) => {
  let valid = 0;
  let invalid = 0;

  for (const item of summarizedRekemList) {
    valid += item.valid;
    invalid += item.invalid;
  }

  return { valid, invalid };
};