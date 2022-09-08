<<<<<<< HEAD
const { usersModel } = require("../models");
const { handleHtppError } = require("../utils/handleError");
const jwt_decode = require("jwt-decode");

const googleMiddleware = async (req, res, next) => {
  const { token } = req.body;

  let { email, name } = jwt_decode(token);
  let username = email.split("@").shift();

  req.body = { email, name, username };

  next();
};

module.exports = { googleMiddleware };
=======
const { usersModel } = require("../models");
const { handleHtppError } = require("../utils/handleError");
const jwt_decode = require("jwt-decode");

const googleMiddleware = async (req, res, next) => {
  const { token } = req.body;

  let { email, name } = jwt_decode(token);
  let username = email.split("@").shift();

  req.body = { email, name, username };

  next();
};

module.exports = { googleMiddleware };
>>>>>>> back
