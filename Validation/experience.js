const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  // ternary, if its not empty, then it'll be as it should, if it is then it'll be an empty string.
  
  data.name = !isEmpty(data.name) ? data.name : '';
  data.artist = !isEmpty(data.artist) ? data.artist : '';
  data.date = !isEmpty(data.date) ? data.date : '';

  
  if(Validator.isEmpty(data.name)) {
  errors.name = 'Concert name field is required';
  }

  if(Validator.isEmpty(data.artist)) {
  errors.artist = 'Artist field is required';
  }

  if(Validator.isEmpty(data.date)) {
  errors.date = 'Date field is required';
  }

    return {
      errors,
      isValid: isEmpty(errors)
    }
}
// we will be able to access this function from outside this file, since its module.exported.