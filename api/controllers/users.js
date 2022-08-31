const { usersModel } = require("../models/index");

const getAllUsers = async (req, res, next) => {
    try {
        const users = await usersModel.find({});
        return res.json(users)
    } catch (e) {
        // res.status(e.response.status)
        return res.json(e.message)
    }
};

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await usersModel.findById(id).exec();
        if (!user) {
            return res.send('Usuario inexistente')
        }
        return res.json(user)

    } catch (e) {
        return res.json(e.message)
    }
}

const createUser = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await usersModel.create(body);
        return res.json(user)
    } catch (e) {
        return res.json(e.message)
    }
};

// const updateUserSchool = async (req, res, next) => {
//     try {

//     } catch (e) {

//     }
// }

module.exports = {
    getAllUsers,
    getUserById,
    createUser
}