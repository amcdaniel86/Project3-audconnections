// all we're doing with the node app in this case because we have react for front-end is  to serve up json files and then we pick up the json files from the front end.

// users.js is only for authentication related purposes such as username, password, passport etc.

// profile.js is for strings, non authentication purposes like bio, location etc.

// to test a route at this point, just go to localhost:5000/api/users/test and it'll provide a json response with an object.

// with mongoose you create models with schemas

// best way to test routes without front end being done yet, is with Postman is a great software to deal with backend API's.

// jwt is a small part of the main passport authentication module.

// two forms of validation - mongoose, required: true and our own which are in the validation files.