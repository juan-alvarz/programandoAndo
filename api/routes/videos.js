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

//http://localhost/track, GET, POST, DELETE, PUT
router.get("/", getVideos);
router.get("/:id", getVideo);
router.delete("/:id", deleteVideo);
router.delete('/softDelete/:id', softDeleteVideo);
router.patch('/:id', restoreVideo);
router.put('/:id', updateVideo);
router.post("/", createVideo);

module.exports = router;
//ruta videos
