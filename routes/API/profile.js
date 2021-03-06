const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');


// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Profile
const User = require('../../models/User');


// @route     GET api/profile/test
// @desc      Tests profile route
// @access    Public 
router.get('/test', (req, res) => res.json({msg: "Profile Works"}));
// res.json is similar to .send but it'll serve .json files.
// reason you don't have to list /api/profile/test is because the /api/profile part is already on the server.js file setting the default file path for this route. Thus, all that is needed is /test. /api/profile comes before these route path Url's. The app will look at last part on server.js, profile, then go to the profile route file and then find the corresponding route.
// will provide an automatic status of 200. everything is ok is a 200 status.

// @route     GET api/profile
// @desc      Get current users profile
// @access    Private
// trying  to fetch current users profile
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
  .populate('user', ['name', 'avatar'])
  // above .populate organizes user model into an object-section in the data.
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route     GET api/profile/all
// @desc      Get all profiles
// @access    Public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
  .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if(!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => 
      res.status(404).json({ profile: 'There is no profiles' }));
});


// won't be the word handle, it'll be the specific term
// @route     GET api/profile/handle/:handle
// @desc      Get profile by handle
// @access    Public
// Private routes require the passport middleware in first route line.
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  
  Profile.findOne({ handle: req.params.handle })
  .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user.';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// won't be the word handle, it'll be the specific term
// @route     GET api/profile/user/:id
// @desc      Get profile by user ID
// @access    Public
// Private routes require the passport middleware in first route line.
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  
  Profile.findOne({ user: req.params.user_id })
  .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user.';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json({profile: 'There is no profile for this user'}));
});



// @route     POST api/profile
// @desc      Create or Edit user profile
// @access    Private
router.post('/', 
  passport.authenticate('jwt', { session: false }), (req, res) => {
const { errors, isValid } = validateProfileInput(req.body);

// Check Validation
if(!isValid) {
  // Return any errors with 400 status
  return res.status(400).json(errors);
} // we have to do the above 5 lines anywhere (route) we want to validate because it takes the validation functions from other files and summons it.


  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;

  if(req.body.handle) profileFields.handle = req.body.handle;
  if(req.body.favoriteStreamApp) profileFields.favoriteStreamApp = req.body.favoriteStreamApp;
  if(req.body.website) profileFields.website = req.body.website;
  if(req.body.location) profileFields.location = req.body.location;
  if(req.body.bio) profileFields.bio = req.body.bio;
  if(req.body.nextBigArtist) profileFields.nextBigArtist = req.body.nextBigArtist;
  if(req.body.gitHubUsername) profileFields.gitHubUsername = req.body.gitHubUsername;
  // favoriteArtists - Split into array
  if(typeof req.body.favoriteArtists !== 'undefined') {
    profileFields.favoriteArtists = req.body.favoriteArtists.split(',');
  }

  // Social
  profileFields.social = {};
  if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(profile) {
        //  Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
          )
          .then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if(profile) {
              errors.handle = 'That handle already exists';
              res.status(400).json(errors);
            }

            // Save Profile
            new Profile(profileFields).save()
              .then(profile => res.json(profile));
          });
      }
    });
  
});

// @route     POST api/profile/experience
// @desc      Add experience to profile
// @access    Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);

// Check Validation
if(!isValid) {
  // Return any errors with 400 status
  return res.status(400).json(errors);
} // we have to do the above 5 lines anywhere (route) we want to validate because it takes the validation functions from other files and summons it.
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // the concertExperience object below
      const newConcertExp = {
        name: req.body.name,
        artist: req.body.artist,
        location: req.body.location,
        date: req.body.date,
        concertPlans: req.body.concertPlans,
        bestMemory: req.body.bestMemory
      }

      //  Add to exp array
      profile.concertExperience.unshift(newConcertExp);

      profile.save()
        .then(profile => res.json(profile));
    })
});


// @route     POST api/profile/education
// @desc      Add education to profile
// @access    Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);

// Check Validation
if(!isValid) {
  // Return any errors with 400 status
  return res.status(400).json(errors);
} // we have to do the above 5 lines anywhere (route) we want to validate because it takes the validation functions from other files and summons it.
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // the concertExperience object below
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        bestMemory: req.body.bestMemory
      }

      //  Add to edu array
      profile.education.unshift(newEdu);

      profile.save()
        .then(profile => res.json(profile));
    })
});


// @route     DELETE api/profile/experience/:exp_id
// @desc      Remove experience to profile
// @access    Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.concertExperience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

        // Splice out of array
        profile.concertExperience.splice(removeIndex, 1);

        // Save
        profile.save()
          .then(profile => res.json(profile));
    })
          .catch(err => res.status(404).json(err));
});


// @route     DELETE api/profile/education/:edu_id
// @desc      Remove education to profile
// @access    Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.exp_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save()
          .then(profile => res.json(profile));
          })
          .catch(err => res.status(404).json(err));
});


// @route     DELETE api/profile
// @desc      Remove user and profile
// @access    Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  
  Profile.findOneAndRemove({ user: req.user.id })
  .then(() => {
    User.findOneAndRemove({ _id: req.user.id })
      .then(() => res.json({ success: true })
      );
  });
});


module.exports = router;
