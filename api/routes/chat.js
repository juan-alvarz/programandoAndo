const express = require("express");
const {
  getChat,
  createChat,
  getChatById,
  deleteChat,
  updateChat,
} = require("../controllers/chat");
const router = express.Router();

router.get("/", getChat);
router.get("/:id", getChatById);
router.post("/", createChat);
router.delete("/:id", deleteChat);
router.put("/:id", updateChat);

module.exports = router;

// 631a907e8685cf1046907719 FRANCO
// 631b793e3810761965816523 DANIEL
