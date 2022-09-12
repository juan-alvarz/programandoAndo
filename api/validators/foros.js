<<<<<<< HEAD
const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");


const validatorGetorCreateForo = [
    check("comments").exists().notEmpty(),
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

=======
const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");


const validatorGetorCreateForo = [
    check("comments").exists().notEmpty(),
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

>>>>>>> Fran
module.exports = { validatorGetorCreateForo, validatorGetForoById };