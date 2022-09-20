const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const User = require("./User.js");
const mongooseDelete = require("mongoose-delete");

const ChatSchema = new Schema(
  {
    transmitter: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: [
      {
        author: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        content: String,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ChatModel = model("Chat", ChatSchema);
module.exports = ChatModel;
