const { usersModel } = require("../models/index");
const { encrypt, compare } = require("../utils/handlePassword");
const {
  tokenSign,
  verifyEmailToken,
  verifyChangeToken,
} = require("../utils/handleJwt");
const { handleHtppError } = require("../utils/handleError");
const {
  sendConfirmationEmail,
  sendChangePasswordEmail,
  sendEmailDonation,
} = require("../config/nodemailer.config");

const getAllUsers = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (name) {
      const data = await usersModel
        .find({ name: { $regex: "." + name + ".", $options: "<i>" } })
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
    res.status(400).json(e.message);
  }
};

const createUser = async (req, res, next) => {
  try {
    const body = req.body;
    const find = await usersModel.findOne({ email: body.email });
    console.log(find);

    if (find) {
      return handleHtppError(res, "User already exist", 401);
    }
    // console.log(body);
    let username = body.email.split("@").shift();
    const password = await encrypt(body.password); //encrypta la password
    const emailToken = await verifyEmailToken(body.email);

    const newBody = {
      ...body,
      password,
      confirmationCode: emailToken,
      username,
    };
    const userData = await usersModel.create(newBody);
    userData.set("password", undefined, { strict: false }); //No muestre la password al crear

    const token = await tokenSign(userData);
    //=== Creo un objeto con el usuario y el jwt ==
    const data = {
      token,
      user: userData,
    };
    sendConfirmationEmail(
      userData.username,
      userData.email,
      userData.confirmationCode
    );
    if (userData.status != "active") {
      return handleHtppError(
        res,
        "Pending Account. Please Verify Your Email!",
        401
      );
    }

    res.status(201).json(data);
    return;
  } catch (e) {
    return res.json(e.message);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email });
    const hashPassword = await usersModel.findOne({ email }).select("password");
    // console.log(hashPassword.password);

    if (!user) {
      handleHtppError(res, "User dont exists", 404);
      return;
    }

    if (hashPassword.password === undefined) {
      handleHtppError(res, "Please register a password", 404);
      return;
    }
    // const hashPassword = user.get("password");
    // console.log(hashPassword);
    const checkPassword = await compare(password, hashPassword.password);

    if (!checkPassword) {
      handleHtppError(res, "Password Invalid", 401);
      return;
    }

    user.set("password", undefined, { strict: false }); // oculto la password

    const data = {
      token: await tokenSign(user),
      user,
    };
    if (user.status != "active") {
      handleHtppError(res, "Pending Account. Please Verify Your Email!", 401);
    }

    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const googleUserLogin = async (req, res, next) => {
  const { name, username, email } = req.body;
  // console.log(req.body);

  let find = await usersModel.findOne({ email });
  // console.log(find);

  if (!find) {
    const emailToken = await verifyEmailToken(email);

    let user = await usersModel.create({
      name,
      username,
      email,
      confirmationCode: emailToken,
    });
    user.set("password", undefined, { strict: false }); // oculto la password

    const data = {
      token: await tokenSign(user),
      user,
    };
    sendConfirmationEmail(user.username, user.email, user.confirmationCode);
    res.send(data);
  } else {
    if (find.status != "active") {
      return handleHtppError(
        res,
        "Pending Account. Please Verify Your Email!",
        401
      );
    }
    const dataGoogle = {
      token: await tokenSign(find),
      user: find,
    };
    // console.log(dataGoogle);
    res.send(dataGoogle);
  }
};

const changePasswordRequest = async (req, res, next) => {
  const { email } = req.body;

  const findUser = await usersModel.findOne({ email });
  if (!findUser) {
    return handleHtppError(res, "User Not found", 404);
  }

  const changePassToken = await verifyChangeToken(email);

  const data = await usersModel.updateOne(
    { email },
    {
      changePassCode: changePassToken,
    }
  );
  res.status(201);
  res.send(data);
  sendChangePasswordEmail(findUser.username, findUser.email, changePassToken);
  return;
};

const submitChangePass = async (req, res, next) => {
  const { changePassCode } = req.params;
  const { password } = req.body;
  const hashPassword = await encrypt(password);
  const user = await usersModel.findOne({ changePassCode });

  if (!user) {
    return handleHtppError(res, "Token is changed", 404);
  }
  if (!password) {
    return handleHtppError(res, "Bad Request Password", 404);
  }
  const data = await usersModel.updateOne(
    { changePassCode },
    {
      password: hashPassword,
    }
  );
  if (!data.modifiedCount) {
    handleHtppError(res, "Fail in the query", 422);
  }
  res.status(200).send("Password changed succesfully");
  return res.send(data);
};

const verifyUser = async (req, res, next) => {
  const { confirmationCode } = req.params;
  const user = await usersModel.findOne({ confirmationCode });

  if (!user) {
    return handleHtppError(res, "User Not found", 404);
  }

  if (user.status === "active") {
    return handleHtppError(res, "You are already verified", 200);
  }

  user.status = "active";
  user.save((err) => {
    if (err) {
      return handleHtppError(res, { err }, 500);
    }
  });
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await usersModel.findById(id);
    const passwordUser = await usersModel.findById(id).select("password");
    // console.log(passwordUser.password)
    console.log(user.role);

    if (body.password) {
      var password = await encrypt(body.password);
      console.log(password);
    }
    if (user.role === "owner") {
      const newBody = { ...body, password };
      const data = await usersModel.updateOne(
        { _id: id },
        {
          username: body.username ? body.username : user.username,
          password: body.password ? password : passwordUser.password,
          name: body.name ? body.name : user.name,
          email: body.email ? body.mail : user.email,
          schools: body.schools ? body.schools : user.schools,
          role: body.role ? body.role : user.role,
          ownPath: body.ownPath ? body.ownPath : user.ownPath,
          favorites: body.favorites ? body.favorites : user.favorites,
          contributor: body.contributor ? body.contributor : user.contributor,
          banned: body.banned ? body.banned : user.banned,
        }
      );
      if (!data.modifiedCount) {
        handleHtppError(res, "Fail in the query", 422);
      }
      res.status(201);
      return res.send(data);
    }
    if (user.role === "user") {
      const data = await usersModel.updateOne(
        { _id: id },
        {
          username: body.username ? body.username : user.username,
          password: body.password ? password : passwordUser.password,
          name: body.name ? body.name : user.name,
          email: body.email ? body.mail : user.email,
          schools: body.schools ? body.schools : user.schools,
          ownPath: body.ownPath ? body.ownPath : user.ownPath,
          favorites: body.favorites ? body.favorites : user.favorites,
          contributor: body.contributor ? body.contributor : user.contributor,
        }
      );
      if (!data.modifiedCount) {
        handleHtppError(res, "Fail in the query", 422);
      }
      return res.status(201).send(data);
    }
    if (user.role === "admin") {
      const newBody = { ...body, password };
      const data = await usersModel.updateOne(
        { _id: id },
        {
          username: body.username ? body.username : user.username,
          password: body.password ? password : passwordUser.password,
          name: body.name ? body.name : user.name,
          email: body.email ? body.mail : user.email,
          schools: body.schools ? body.schools : user.schools,
          ownPath: body.ownPath ? body.ownPath : user.ownPath,
          favorites: body.favorites ? body.favorites : user.favorites,
          contributor: body.contributor ? body.contributor : user.contributor,
          banned: body.banned ? body.banned : user.banned,
        }
      );
      if (!data.modifiedCount) {
        handleHtppError(res, "Fail in the query", 422);
      }
      res.status(201);
      return res.send(data);
    }
  } catch (e) {
    return handleHtppError(res, "Cant make changes", 422);
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

const successDonation = (req, res) => {
  try {
    const { name, email, amount } = req.body;
    console.log(`este es params` + req.body);
    sendEmailDonation(name, email, amount);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error.message);
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
  googleUserLogin,
  verifyUser,
  submitChangePass,
  changePasswordRequest,
  successDonation,
};
