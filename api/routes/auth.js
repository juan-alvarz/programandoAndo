const { Router } = require("express");
const router = Router();

const { gitHubData,gitHubCreate, isLogin} = require("../controllers/auth");

router.get('/github_login',gitHubData,gitHubCreate)

router.get('/me',isLogin)

module.exports = router;