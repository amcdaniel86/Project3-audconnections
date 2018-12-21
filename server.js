// Entrypoint file

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// this enables  req.body to be able to used with routing passing data from back to front end.


// DB CONFIG
const db = require("./config/keys").mongoURI;
// connecting to mongoURI in key file.

// Connect to MongoDB
mongoose
  .connect(db)
    .then(()  =>
      console.log("MongoDB Connected"))
    // .then is success, if so, then arrow function console.log
    .catch(err =>
      console.log(err));

app.get("/", (req, res) => res.send("Hello World"));
// 2 parameters req, res are two objects request and response.
// initial route to test server.
// will show Hello in browser when tested.

// Use Routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

const port = process.env.PORT || 5000;
// process.env is to get prepared for heroku deployment, and 5000 is again for local use, will change for deployment.

app.listen(port, () => console.log(`Server running on port  ${port}`));
// es6 syntax with backticks to output server running... on port variable from above.
