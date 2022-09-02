const { Router } = require("express");
const router = Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  softDeleteUser,
  restoreUser
} = require("../controllers/users");
const { validatorCreateUser, validatorGetUsers } = require("../validators/users");

module.exports = router;

router.get("/", getAllUsers);

router.get("/:id", validatorGetUsers, getUserById);

router.post("/", validatorCreateUser, createUser);

router.put('/:id', validatorGetUsers, updateUser);

router.patch('/:id', validatorGetUsers, restoreUser);

router.delete('/:id', validatorGetUsers, softDeleteUser)


