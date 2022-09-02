const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateUser = [
  check("name").exists().notEmpty(),

  check("email").exists().notEmpty().isEmail(),

  check("password").exists().notEmpty(),

  check("contributor").exists().notEmpty(),

  check("banned").exists().notEmpty(),

  check("isAdmin").exists().notEmpty(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
//
module.exports = validatorCreateUser;
