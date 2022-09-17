const { chatModel, usersModel } = require("../models/");

const getChat = async (req, res) => {
  try {
    const data = await chatModel
      .find({})
      .populate({
        path: "transmitter",
        select: "name",
      })
      .populate({
        path: "receiver",
        select: "name",
      })
      .populate({
        path: "content",
        populate: {
          path: "author",
          select: "name",
        },
      });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const createChat = async (req, res) => {
  const { transmitter, receiver, content } = req.body;
  try {
    const newChat = new chatModel({
      transmitter,
      receiver,
      content,
    });
    await newChat.save();
    const user1 = await usersModel.findById(transmitter);
    const user2 = await usersModel.findById(receiver);
    //actualiza el emisor
    await usersModel.updateOne(
      { _id: transmitter },
      {
        chats: [...user1.chats, newChat._id],
      }
    );
    //actualiza el receptor
    await usersModel.updateOne(
      { _id: receiver },
      {
        chats: [...user2.chats, newChat._id],
      }
    );
    return res.status(200).json(newChat);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getChatById = async (req, res) => {
  const { id } = req.params;
  try {
    const chatId = await chatModel
      .findById(id)
      .populate({
        path: "transmitter",
        select: "name",
      })
      .populate({ path: "receiver", select: "name" })
      .populate({
        path: "content",
        populate: {
          path: "author",
          select: "name",
        },
      });
    if (!chatId) {
      return res.status(404).json({ error: "id inexistent" });
    } else {
      return res.status(200).json(chatId);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await chatModel.deleteOne({ _id: id });
    return res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(error.response.status).json(error.message);
  }
};

const updateChat = async (req, res) => {
  try {
    const { author, content } = req.body;
    const { id } = req.params;
    const chat = await chatModel.findById(id);
    await chatModel.updateOne(
      { _id: id },
      {
        content: [...chat.content, { author, content }],
      }
    );
    const chatFinal = await chatModel.findById(id);
    return res.status(200).json(chatFinal);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  getChat,
  createChat,
  getChatById,
  deleteChat,
  updateChat,
};
