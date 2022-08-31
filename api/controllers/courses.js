const Course = require("../models/Course.js");

const getCourses = async (req, res) => {
  try {
    const data = await Course.find({}).populate({
      path: "videos",
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const { name, description, videos, image } = req.body;
    const newCourse = new Course({
      name,
      description,
      videos,
      image,
    });
    await newCourse.save();
    return res.status(200).send("Course created");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCourses,
  createCourse,
};
