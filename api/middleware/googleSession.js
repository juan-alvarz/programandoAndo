const { usersModel } = require("../models");
const { handleHtppError } = require("../utils/handleError");
const jwt_decode = require("jwt-decode");

const googleMiddleware = async (req, res, next) => {
  const { token } = req.body;

  let uwu = jwt_decode(token);
  console.log(uwu);
  let { email, name, picture } = jwt_decode(token);
  let username = email.split("@").shift();
  let image = { url: picture, public_id: "" };

  req.body = { email, name, username, image };

  next();
};

module.exports = { googleMiddleware };
