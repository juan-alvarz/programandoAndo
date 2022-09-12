const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateCourse = [
  check("name").exists().notEmpty(),

  check("description").exists().notEmpty(),

  check("videos").exists().notEmpty(),

  check("image").exists().notEmpty(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetCourse = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateCourse, validatorGetCourse };
