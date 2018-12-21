const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  // ternary, if its not empty, then it'll be as it should, if it is then it'll be an empty string.
  
  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';

  
  if(Validator.isEmpty(data.school)) {
  errors.school = 'School field is required';
  }

  if(Validator.isEmpty(data.degree)) {
  errors.degree = 'Degree field is required';
  }

  if(Validator.isEmpty(data.fieldOfStudy)) {
  errors.fieldOfStudy = 'fieldOfStudy field is required';
  }

  if(Validator.isEmpty(data.from)) {
  errors.from = 'from field is required';
  }

    return {
      errors,
      isValid: isEmpty(errors)
    }
}
// we will be able to access this function from outside this file, since its module.exported.