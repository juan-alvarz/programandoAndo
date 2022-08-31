const { getUsers } = require("../controllers/users");
const express = require("express");
const router = express.Router();

router.get("/", getUsers);

module.exports = router;
