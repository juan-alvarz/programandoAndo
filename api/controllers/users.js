const { usersModel } = require("../models/index");
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
      if (!data.length) {
        handleHtppError(res, "User not found", 404);
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
    // res.status(e.response.status);
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
    }
    return res.json(user);
  } catch (e) {
    // res.status(e.response.status);
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

    const hashPassword = user.get("password");
    const checkPassword = await compare(password, hashPassword);

    if (!checkPassword) {
      handleHtppError(res, "Password Invalid", 401);
      return;
    }

    user.set("password", undefined, { strict: false }); // oculto la password

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
    const data = await usersModel.updateOne({ _id: id }, body);
    if (!data.modifiedCount) {
      handleHtppError(res, "Fail in the query", 422);
    }
    res.status(201);
    return res.send("The user was updated");
  } catch (e) {
    return res.json(e.message);
  }
};

const softDeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await usersModel.delete({ _id: id });
    return res.json(data);
  } catch (e) {
    return res.json(e.message);
  }
};

const restoreUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await usersModel.restore({ _id: id });
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

// Concatenar videos-cursos-escuelas, lógica

// const {schools, ...body} = req.body;
// if(schools.length) {
    //   const user = await UserModel.findById(id);
    //   console.log(user, 'user')
    //   user.schools = user.schools.concat(schools);
    //   await user.save()
    // }