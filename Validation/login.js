const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  // ternary, if its not empty, then it'll be as it should, if it is then it'll be an empty string.
  
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

if(Validator.isEmpty(data.email)) {
errors.email = 'Email field is required';
}

if(!Validator.isEmail(data.email)) {
errors.email = 'Email is invalid';
}

if(Validator.isEmpty(data.password)) {
errors.password = 'Password field is required';
}

    return {
      errors,
      isValid: isEmpty(errors)
    }
}
// we will be able to access this function from outside this file, since its module.exported.