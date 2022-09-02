const Video = require("../models/Video.js");
//const { videoModel } = require("../models");
const getVideos = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const data = await Video.find({ name: { $regex: '.*' + name + '.*', $options: '<i>' } });
      if (!data) {
        res.status(404);
        res.json({ message: 'Video not found' })
      }
      return res.json(data)
    }
    const data = await Video.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVideo = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const videoId = await Video.findById(id);
      if (!videoId) {
        return res.status(404).json({ message: "inexistent id" });
      }
      return res.status(200).json(videoId);
    }
    return res.status(400).json({ message: "id is required" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const createVideo = async (req, res) => {
  try {
    const {
      name,
      description,
      author,
      profile,
      url,
      image,
      duration,
      difficult,
    } = req.body;
    const newVideo = new Video({
      name,
      description,
      author,
      profile,
      url,
      image,
      duration,
      difficult,
    });
    await newVideo.save();
    return res.status(200).json(newVideo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const videoToDelete = await Video.findById(id);
      if (!videoToDelete)
        return res.status(404).json({ message: "inexistent id" });
      await Video.deleteOne({ id: id });
      return res.status(200).json({ message: "deleted succesfully" });
    }
    return res.status(400).json({ message: "id is required" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = {
  deleteVideo,
  getVideos,
  getVideo,
  createVideo,
};
