const { usersModel } = require("../models/index");
const UserModel = require("../models/User");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHtppError } = require("../utils/handleError");
const getAllUsers = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (name) {
      const data = await usersModel
        .find({ name: { $regex: ".*" + name + ".*", $options: "<i>" } })
        .populate({
          path: "schools",
          populate: {
            path: "courses",
            populate: { path: "videos" },
          },
        });
      if (!data) {
        handleHtppError(res, "User not found", 404);
        // res.status(404);
        // res.json({ message: "User not found" });
      }
      return res.json(data);
    }
    const users = await usersModel.find({}).populate({
      path: "schools",
      populate: {
        path: "courses",
        populate: { path: "videos" },
      },
    });
    return res.json(users);
  } catch (e) {
    res.status(e.response.status);
    return res.json(e.message);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersModel.findById(id).populate({
      path: "schools",
      populate: {
        path: "courses",
        populate: { path: "videos" },
      },
    });
    if (!user) {
      handleHtppError(res, "user doesn't exist", 404);
      // res.status(404);
      // return res.send("user doesn't exist");
    }
    return res.json(user);
  } catch (e) {
    res.status(e.response.status);
    return res.json(e.message);
  }
};

const createUser = async (req, res, next) => {
  try {
    const body = req.body;

    const password = await encrypt(body.password); //encrypta la password

    const newBody = { ...body, password };
    const userData = await usersModel.create(newBody);
    userData.set("password", undefined, { strict: false }); //No muestre la password al crear

    //=== Creo un objeto con el usuario y el jwt ==
    const data = {
      token: await tokenSign(userData),
      user: userData,
    };

    return res.status(201).json(data);
  } catch (e) {
    return res.json(e.message);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel
      .findOne({ email })
      .select("password name isAdmin email");

    if (!user) {
      handleHtppError(res, "User dont exists", 404);
      return;
    }

    // user.set("password", undefined, { strict: false });
    const hashPassword = user.get("password");
    const checkPassword = await compare(password, hashPassword);

    if (!checkPassword) {
      handleHtppError(res, "Password Invalid", 401);
      // res.status(401).send({ msg: "Password Invalid" });
      return;
    }

    user.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(user),
      user,
    };

    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const data = await UserModel.updateOne({ _id: id }, body);
    if (!data.modifiedCount) {
      handleHtppError(res, "Fail in the query", 422);
      // res.status(422);
      // return res.send("Fail in the query");
    }
    res.status(201);
    return res.send("The user was updated");
  } catch (e) {
    res.status(e.response.status);
    return res.json(e.message);
  }
};

const softDeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await UserModel.delete({ _id: id });
    return res.json(data);
  } catch (e) {
    return res.json(e.message);
  }
};

const restoreUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await UserModel.restore({ _id: id });
    return res.json(data);
  } catch (e) {
    return res.json(e.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  softDeleteUser,
  restoreUser,
  userLogin,
};
