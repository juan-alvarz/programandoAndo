const express = require("express");
const { getVideos, createVideo } = require("../controllers/videos");
const router = express.Router();

router.get("/", getVideos);
router.post("/", createVideo);

module.exports = router;
