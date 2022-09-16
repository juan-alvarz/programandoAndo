const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateNotification = [

  check("description").exists().notEmpty(),

  check("title").exists().notEmpty(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetNotification = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateNotification, validatorGetNotification };
