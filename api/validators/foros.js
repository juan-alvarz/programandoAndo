const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");


const validatorGetorCreateForo = [
  check("idVideo").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetForoById = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
]

module.exports = { validatorGetorCreateForo, validatorGetForoById };