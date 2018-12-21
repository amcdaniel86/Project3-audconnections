const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load User model when starting to bring models into route functionality.
const User = require('../../models/User');
// ../ out from the api folder, then ../ out of the routes folder.


// @route     GET api/users/test
// @desc      Tests users route
// @access    Public 
router.get('/test', (req, res) => res.json({msg: "Users Works"}));
// res.json is similar to .send but it'll serve .json files.
// reason you don't have to list /api/users/test is because the /api/users part is already on the server.js file setting the default file path for this route. Thus, all that is needed is /test. /api/users comes before these route path Url's. The app will look at last part on server.js, users, then go to the users route file and then find the corresponding route.
// will provide an automatic status of 200. everything is ok is a 200 status.


// @route     GET api/users/register
// @desc      Register user
// @access    Public
// cant be logged in to be able to register.
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({email: 'Email already exists'});
      } else {
        // else, meaning ok, there wasn't an existing email newuser entered, so... create a new user, thus const and so on below.
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
      });

        const newUser = new User({
          // when making a resource with mongoose, say new then model name, and pass in the data as an object.
              name: req.body.name,
              email: req.body.email,
              avatar, // above next to else
              // if same then you can just put word then ,
              password: req.body.password
              // generates a new user with above fields.
        });
// after making a new user, it creates a salt for the password to be hashed.
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
        });

      }
    });
  // first step... is to use mongoose to see if the email exists. once model is required, then any mongoose methods can be used.
  // req.body - data to a route through a POST request, through form in react, we access it with REQ.BODY. and input name which in this case is email.
});


// @route     GET api/users/login
// @desc      Login User / Returning JWT Token
// @access    Public
router.post('/login', (req, res) => {
  // remember here on page, user is using a form to login right? thus, guess what is needed? req.body!
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
    User.findOne({email}) //only email because the user typing in their email is their way to log in.
      .then(user => {
        // Check for user
        if(!user) {
          return res.status(404).json({email: 'User not found'});
        }

        // Check Password
        bcrypt.compare(password, user.password)
         //hashed password from db because that is user within findOne function, its found in the database,  and so the hashed password comes with finding the user's json in the db.
          .then(isMatch => {
            if(isMatch) {
              // if User matches, then jwt token should be generated in next iteration. right now, it's just giving a message, inside of a json object.
              // User matched

              const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload
              
              // Sign Token
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => { //send the token below with res.json
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  }); // next step is taking the created token, which we can see in postman, and placing it in the header section of postman as an authorization.
              });
            } else {
              return res.status(400).json({password: 'Password incorrect' });
            }
          });
      });
});


// @route     GET api/users/current
// @desc      Return current user
// @access    Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => { //we treat this like any other route except now its proteted with above passport.authenticate.
  // res.json({ msg: 'Success' }); initial test before user was created. below is next step.
  res.json({
    id:  req.user.id,
    name: req.user.name,
    email: req.user.email
    // password isn't needed.
  });
});

module.exports = router;
