const { Schema, model } = require("mongoose");

const VideoSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },   
    duration: {
      type: String,
    },
    difficult: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: true,
  }
);

const VideoModel = model("Video", VideoSchema);

module.exports = VideoModel;
