const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users' //refers to a collection
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  favoriteStreamApp: {
    type: String,
    // required: true
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  nextBigArtist: {
    type: String,
    required: true
  },
  favoriteArtists: {
    type: [String], //will be able to put comma separated values in a form, that'll go in the array.
    required: true
  },
  bio: {
    type: String
  },
  gitHubUsername: {
    type: String
  },
  concertExperience: [
    {
      name: {
        type: String,
        required: true
      },
      artist: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      date: {
        type: Date,
        required: true
      },
      concertPlans: {
        type: Boolean,
        default: false
      },
      bestMemory: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldOfStudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,  
      },
      current: {
        type: Boolean,
        default: false
      },
      bestMemory: {
        type: String
      }
    }
  ],
  // social is an object of fields (smaller objects, objects within an object)
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    },
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);