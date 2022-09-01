const { usersModel } = require("../models/index");

const getAllUsers = async (req, res, next) => {
    try {
        const users = await usersModel.find({}).populate('schools')
        return res.json(users)
    } catch (e) {
        // res.status(e.response.status)
        return res.json(e.message)
    }
};

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await usersModel.findById(id).exec().populate('schools');
        if (!user) {
            res.status(404)
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
        res.status(201)
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