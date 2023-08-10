const user = require('../models/user.cjs');
const RandExp = require('randexp');

const fields = user.schema.paths;
const regexValidators = [];
for (const field in fields) {
    const validators = fields[field].validators;
    for (const validator in validators) {
        if (validators[validator].validatingRegex !== undefined){
            regexValidators.push({field, regex: validators[validator].validatingRegex});
        }
    };
    
};


console.log(regexValidators);
regexValidators.forEach(item => console.log(new RandExp(item.regex).gen()));