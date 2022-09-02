const { Schema, model } = require("mongoose");

const VideoSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    author: {
      type: String,
    },
    profile: {
      type: String,
    },
    duration: {
      type: String,
    },
    difficult: {
      type: String,
      enum: ["principiante", "intermedio", "avanzado"],
      default: "principiante",
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const VideoModel = model("Video", VideoSchema);

module.exports = VideoModel;
//esquema video
