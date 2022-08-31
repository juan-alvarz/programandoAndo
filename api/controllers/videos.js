const Video = require("../models/Video.js");
const { videoModel } = require("../models");
const getVideos = async (req, res) => {
  try {
    const data = await Video.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createVideo = async (req, res) => {
  try {
    const { name, description, url, image, duration, difficult } = req.body;
    const newVideo = new Video({
      name,
      description,
      url,
      image,
      duration,
      difficult,
    });
    await newVideo.save();
    return res.status(200).send("Video created");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getVideos,
  createVideo,
};
