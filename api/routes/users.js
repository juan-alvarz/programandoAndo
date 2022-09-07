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
  googleUserLogin,
} = require("../controllers/users");
const {
  validatorCreateUser,
  validatorGetUsers,
  validatorLoginUser,
  validatorGoogleLogin,
} = require("../validators/users");

const { googleMiddleware } = require("../middleware/googleSession");

module.exports = router;

router.get("/", getAllUsers);

router.get("/:id", validatorGetUsers, getUserById);

router.post("/register", validatorCreateUser, createUser);

router.post("/login", validatorLoginUser, userLogin);

router.post(
  "/google_login",
  googleMiddleware,
  validatorGoogleLogin,
  googleUserLogin
);

router.put("/:id", validatorGetUsers, updateUser);

router.patch("/:id", validatorGetUsers, restoreUser);

router.delete("/:id", validatorGetUsers, softDeleteUser);
