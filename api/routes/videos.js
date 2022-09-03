const express = require("express");
const {
  getVideos,
  createVideo,
  getVideo,
  deleteVideo,
  softDeleteVideo,
  restoreVideo,
  updateVideo
} = require("../controllers/videos");
const router = express.Router();
const { validatorCreateVideo, validatorGetVideo } = require("../validators/videos");


//http://localhost/track, GET, POST, DELETE, PUT
router.get("/", getVideos);

router.get("/:id", validatorGetVideo, getVideo);

router.delete("/:id", validatorGetVideo, deleteVideo);

router.delete('/softDelete/:id', validatorGetVideo, softDeleteVideo);

router.patch('/:id', validatorGetVideo, restoreVideo);

router.put('/:id', updateVideo);

router.post("/", validatorCreateVideo, createVideo);

module.exports = router;
//ruta videos
