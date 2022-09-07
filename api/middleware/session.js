const { usersModel } = require("../models");
const { handleHtppError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHtppError(res, "Not_session", 401);
      return;
    }

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    if (!dataToken._id) {
      handleHtppError(res, "Id_not_founded", 401);
      return;
    }

    const user = await usersModel.findById(dataToken._id);

    req.user = user;

    next();
  } catch (error) {
    handleHtppError(res, "ERROR_TOKEN", 401);
  }
};

module.exports = { authMiddleware };
