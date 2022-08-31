const express = require("express");
const { getCourses, createCourse } = require("../controllers/courses");
const router = express.Router();

router.get("/", getCourses);
router.post("/", createCourse);

module.exports = router;
