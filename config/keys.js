module.exports = {
  mongoURI:
    "mongodb://alex:rubios86@ds135993.mlab.com:35993/audiophile-connection"
};
// module.exports making this object available outside of this file because we need to connect to it.

// at deployment: we will have different key files for our dev environment than our production. diff databases for dev than production, later on.
