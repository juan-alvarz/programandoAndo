const express = require("express");
const {
  getVideos,
  createVideo,
  getVideo,
  deleteVideo,
} = require("../controllers/videos");
const router = express.Router();

//http://localhost/track, GET, POST, DELETE, PUT
router.get("/", getVideos);
router.get("/:id", getVideo);
router.delete("/:id", deleteVideo);
router.post("/", createVideo);

module.exports = router;
