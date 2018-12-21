const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) //if we're looking at keys of object and there no keys, then its an empty object.
    || (typeof value === 'string' && value.trim().length === 0);

// es7 arrow functions, only need to declare the name of function, the argument, then =>, then enter the rules of the function. no brackets needed.

module.exports = isEmpty;