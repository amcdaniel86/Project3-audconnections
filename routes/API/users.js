const express = require('express');
const router = express.Router();



// @route     GET api/users/test
// @desc      Tests users route
// @access    Public 
router.get('/test', (req, res) => res.json({msg: "Users Works"}));
// res.json is similar to .send but it'll serve .json files.
// reason you don't have to list /api/users/test is because the /api/users part is already on the server.js file setting the default file path for this route. Thus, all that is needed is /test. /api/users comes before these route path Url's. The app will look at last part on server.js, users, then go to the users route file and then find the corresponding route.
// will provide an automatic status of 200. everything is ok is a 200 status.

module.exports = router;
