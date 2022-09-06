const express = require("express");
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  softDeleteCourse,
  restoreCourse,
} = require("../controllers/courses");
const {
  validatorCreateCourse,
  validatorGetCourse,
} = require("../validators/courses");
const router = express.Router();

// VAMOS A GENERAR LA RUTA DE LOS CURSOS -- CRUD EN LA PRIMERA FASE GETALL GETBYID Y CREATE

router.get("/", getCourses);

router.get("/:id", validatorGetCourse, getCourseById);

router.post("/", validatorCreateCourse, createCourse);

router.put("/:id", validatorGetCourse, updateCourse);

router.delete("/:id", validatorGetCourse, softDeleteCourse);

router.patch("/:id", validatorGetCourse, restoreCourse);

module.exports = router;
