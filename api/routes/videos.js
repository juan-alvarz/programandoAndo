const express = require("express");
const {
  getVideos,
  createVideo,
  getVideo,
  deleteVideo,
} = require("../controllers/videos");
const router = express.Router();
const { validatorCreateVideo, validatorGetVideo } = require("../validators/videos");


//http://localhost/track, GET, POST, DELETE, PUT
router.get("/", getVideos);

router.get("/:id", validatorGetVideo, getVideo);

router.delete("/:id", deleteVideo);

router.post("/", validatorCreateVideo, createVideo);

module.exports = router;
//ruta videos
