const express = require("express");
const router = express.Router();
const {
  getAllSchool,
  getSchoolId,
  createSchool,
  softDeleteSchool,
  restoreSchool,
  updateSchool,
  createSchoolUser,
} = require("../controllers/schools");
const {
  validatorCreateSchool,
  validatorGetSchool,
} = require("../validators/schools");

router.get("/", getAllSchool);

router.get("/:id", validatorGetSchool, getSchoolId);

router.post("/", validatorCreateSchool, createSchool);

router.post("/:id", validatorCreateSchool, createSchoolUser);

router.put("/:id", validatorGetSchool, updateSchool);

router.delete("/:id", validatorGetSchool, softDeleteSchool);

router.patch("/:id", validatorGetSchool, restoreSchool);

module.exports = router;
//ruta school
