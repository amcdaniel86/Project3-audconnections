const express = require('express');
const router = express.Router();



// @route     GET api/profile/test
// @desc      Tests profile route
// @access    Public 
router.get('/test', (req, res) => res.json({msg: "Profile Works"}));
// res.json is similar to .send but it'll serve .json files.
// reason you don't have to list /api/profile/test is because the /api/profile part is already on the server.js file setting the default file path for this route. Thus, all that is needed is /test. /api/profile comes before these route path Url's. The app will look at last part on server.js, profile, then go to the profile route file and then find the corresponding route.
// will provide an automatic status of 200. everything is ok is a 200 status.

module.exports = router;
