const { foroModel } = require("../models/index.js");
const Video = require("../models/Video.js");
//const { videoModel } = require("../models");
const getVideos = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const data = await Video.find({
        name: { $regex: ".*" + name + ".*", $options: "<i>" },
      });
      if (!data) {
        res.status(404);
        res.json({ message: "Video not found" });
      }
      return res.json(data);
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
      const videoId = await Video.findById(id); //.populate('foro')
      console.log(videoId.foro);
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
    const myforo = await foroModel.create({ comments: [] });
    console.log(myforo);
    const {
      name,
      description,
      author,
      profile,
      url,
      image,
      duration,
      difficult,
      foro,
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
      foro: myforo._id,
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
    const data = await Video.deleteOne({ _id: id });
    return res.status(200).json({ message: "deleted succesfully" });
  } catch (error) {
    res.status(e.response.status);
    return res.status(400).json(error.message);
  }
};

const softDeleteVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Video.delete({ _id: id });
    return res.json(data);
  } catch (e) {
    res.status(e.response.status);
    return res.json(e.message);
  }
};

const restoreVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Video.restore({ _id: id }).populate("foro");
    return res.json(data);
  } catch (e) {
    return res.json(e.message);
  }
};

const updateVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const data = await Video.updateOne({ _id: id }, body);
    if (!data.modifiedCount) {
      res.status(422);
      return res.send("Fail in the query");
    }
    res.status(201);
    return res.send("The video was updated");
  } catch (e) {
    return res.json(e.message);
  }
};

module.exports = {
  deleteVideo,
  getVideos,
  getVideo,
  createVideo,
  softDeleteVideo,
  restoreVideo,
  updateVideo,
};
