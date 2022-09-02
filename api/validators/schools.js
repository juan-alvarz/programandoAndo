const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateSchool = [
  check("name").exists().notEmpty(),

  check("description").exists().notEmpty(),

  check("courses").exists().notEmpty(),

  check("image").exists().notEmpty(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateSchool };
