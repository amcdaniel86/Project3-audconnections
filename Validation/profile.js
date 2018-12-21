const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};
  // initialize an errors object above

  // ternary, if its not empty, then it'll be as it should, if it is then it'll be an empty string.
  
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.nextBigArtist = !isEmpty(data.nextBigArtist) ? data.nextBigArtist : '';
  data.favoriteArtists = !isEmpty(data.favoriteArtists) ? data.favoriteArtists : '';

  if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to be between 2 and 40 characters';
  }

  if(Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if(Validator.isEmpty(data.nextBigArtist)) {
    errors.nextBigArtist = 'nextBigArtist field is required';
  }

  if(Validator.isEmpty(data.favoriteArtists)) {
    errors.favoriteArtists = 'favoriteArtists field is required';
  }

  if(!isEmpty(data.website)){
    if(!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  if(!isEmpty(data.youtube)){
    if(!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }
  if(!isEmpty(data.twitter)){
    if(!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }
  if(!isEmpty(data.facebook)){
    if(!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }
  if(!isEmpty(data.linkedin)){
    if(!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }
  if(!isEmpty(data.instagram)){
    if(!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

    return {
      errors,
      isValid: isEmpty(errors)
    };
};
// we will be able to access this function from outside this file, since its module.exported.