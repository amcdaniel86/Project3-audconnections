const express = require('express');
const router = express.Router();




// @route     GET api/posts/test
// @desc      Tests posts route
// @access    Public 
router.get('/test', (req, res) => res.json({msg: "Posts Works"}));
// res.json is similar to .send but it'll serve .json files.
// reason you don't have to list /api/posts/test is because the /api/posts part is already on the server.js file setting the default file path for this route. Thus, all that is needed is /test. /api/posts comes before these route path Url's. The app will look at last part on server.js, posts, then go to the posts route file and then find the corresponding route.
// will provide an automatic status of 200. everything is ok is a 200 status.

module.exports = router;
