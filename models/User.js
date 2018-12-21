// Model are singular and capital

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    // this is where you decide what your User's collection is going to have. name, password, email, avatar and date etc.
// below how a field is defined. in this case, field is an object
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
        // will give the current date as of now.
      }
});

module.exports = User = mongoose.model('users', UserSchema);

// parameters are name we want to use, then the actual Schema, User.