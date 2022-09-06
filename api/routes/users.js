const { Router } = require("express");
const router = Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  softDeleteUser,
  restoreUser,
  userLogin,
} = require("../controllers/users");
const {
  validatorCreateUser,
  validatorGetUsers,
  validatorLoginUser,
} = require("../validators/users");

module.exports = router;

router.get("/", getAllUsers);

router.get("/:id", validatorGetUsers, getUserById);

router.post("/register", validatorCreateUser, createUser);

router.post("/login", validatorLoginUser, userLogin);

router.put("/:id", validatorGetUsers, updateUser);

router.patch("/:id", validatorGetUsers, restoreUser);

router.delete("/:id", validatorGetUsers, softDeleteUser);
