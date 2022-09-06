const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateVideo = [
  check("name").exists().notEmpty(),

  check("description").exists().notEmpty(),

  check("author").exists().notEmpty(),

  check("profile").exists().notEmpty(),

  check("duration").exists().notEmpty(),

  check("difficult").exists().notEmpty(),

  check("url").exists().notEmpty().isURL(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetVideo = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateVideo, validatorGetVideo };
