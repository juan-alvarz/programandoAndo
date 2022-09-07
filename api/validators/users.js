const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateUser = [
  check("name").exists().notEmpty().isLength({ min: 8, max: 50 }),

  check("email").exists().notEmpty().isEmail(),

  check("password").exists().notEmpty().isLength({ min: 8, max: 16 }),

  check("contributor").exists().notEmpty(),

  check("banned").exists().notEmpty(),

  check("role").exists().notEmpty(),
  
  check('userName').exists().notEmpty(),

  check('ownPath').exists().notEmpty(),
  
  check('language').exists().notEmpty(),
  
  check('country').exists().notEmpty(),

  check('birthday').exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorLoginUser = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 8, max: 16 }),
];

const validatorGetUsers = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateUser, validatorGetUsers, validatorLoginUser };
