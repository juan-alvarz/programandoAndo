const { Schema, model } = require("mongoose");

const VideoSchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
    },
    difficult: {
      type: ['principiante', 'intermedio', 'avanzado'],
      default: 'principiante'
    },
    url: {
      type: String
    },
  },
  {
    timestamps: true,
    //versionKey: false,
  }
);

const VideoModel = model("Video", VideoSchema);

module.exports = VideoModel;
