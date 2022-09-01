const {check} = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorCreateUser = [
    check("name")
    .exists()
    .notEmpty(),

    check("email")
    .exists()
    .notEmpty(),

    check("password")
    .exists()
    .notEmpty(),

    check("contributor")
    .exists()
    .notEmpty(),

    (req,res,next) =>{
        return validateResults(req,res,next)
    }
];

module.exports = validatorCreateUser