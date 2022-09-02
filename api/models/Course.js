const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const Video = require("./Video.js");

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
<<<<<<< HEAD
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
=======
    videos: [{
      type: Schema.Types.ObjectId,
      ref: "Video",
    }],
>>>>>>> back
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CourseModel = model("Course", CourseSchema);

module.exports = CourseModel;
