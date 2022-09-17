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
  verifyUser,
  submitChangePass,
  successDonation,
  updateFavorites,
  deleteFavorites,
  changePasswordRequest
} = require("../controllers/users");
const {
  validatorCreateUser,
  validatorGetUsers,
  validatorLoginUser,
  validatorGoogleLogin,
} = require("../validators/users");

const { googleMiddleware } = require("../middleware/googleSession");



router.get("/", getAllUsers);

router.get("/:id", validatorGetUsers, getUserById);

router.get("/auth/confirm/:confirmationCode", verifyUser);

router.post("/auth/confirm/:changePassCode", submitChangePass);

router.post("/register", validatorCreateUser, createUser);

router.post("/forget_password",changePasswordRequest)

router.post("/login", validatorLoginUser, userLogin);

router.post(
  "/google_login",
  googleMiddleware,
  validatorGoogleLogin,
  googleUserLogin
);

router.put("/:id", validatorGetUsers, updateUser);

router.put("/addFavorites/:id", updateFavorites);

router.put("/deleteFavorites/:id", deleteFavorites);

router.patch("/:id", validatorGetUsers, restoreUser);

router.delete("/:id", validatorGetUsers, softDeleteUser);

router.post("/emailDonationSuccess/", successDonation);


module.exports = router;