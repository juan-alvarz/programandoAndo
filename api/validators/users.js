<<<<<<< HEAD
const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateUser = [
  check("name").exists().notEmpty().isLength({ min: 8, max: 50 }),

  check("email").exists().notEmpty().isEmail(),

  check("password").exists().notEmpty().isLength({ min: 8, max: 16 }),
  
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorLoginUser = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 8, max: 16 }),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGoogleLogin = [
  check("email").exists().notEmpty().isEmail(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetUsers = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorCreateUser,
  validatorGetUsers,
  validatorLoginUser,
  validatorGoogleLogin,
};
=======
const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateUser = [
  check("name").exists().notEmpty().isLength({ min: 8, max: 50 }),

  check("email").exists().notEmpty().isEmail(),

  check("password").exists().notEmpty().isLength({ min: 8, max: 16 }),
  
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorLoginUser = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 8, max: 16 }),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGoogleLogin = [
  check("email").exists().notEmpty().isEmail(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetUsers = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorCreateUser,
  validatorGetUsers,
  validatorLoginUser,
  validatorGoogleLogin,
};
>>>>>>> ac3cf82 (verified email and change password email)
