const { usersModel } = require("../models/index");
const UserModel = require("../models/User");

const getAllUsers = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (name) {
      const data = await usersModel.find({ name: { $regex: '.*' + name + '.*', $options: '<i>' } }).populate({
        path: "schools",
        populate: {
          path: "courses",
          populate: { path: "videos" },
        },
      });
      if (!data) {
        res.status(404);
        res.json({ message: 'User not found' })
      }
      return res.json(data)
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
    return res.status(400).json(e.message);
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
      res.status(404);
      return res.send("user doesn't exist");
    }
    return res.json(user);
  } catch (e) {
    return res.json(e.message);
  }
};

const createUser = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await usersModel.create(body);
    res.status(201);
    return res.json(user);
  } catch (e) {
    return res.json(e.message);
  }
};

const updateMany = async (req, res, next) => {
  try {
    const {id} = req.query;
    const body = req.body;
    const data = await UserModel.updateOne({_id: id}, body);
    if(!data.modifiedCount){
      res.status(422)
      return res.send('Fail in the query')
    }
    res.status(201);
    return res.send('The user was updated')
  } catch (e) {
    return res.json(e.message)
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateMany
};
