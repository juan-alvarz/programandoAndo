const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const Video = require("./Video.js");
const mongooseDelete = require("mongoose-delete");

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    image: {
      type: String,
    },
    duration: {
      type: Number,
      default: 0,
    },
    score: {
      type: mongoose.Decimal128,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CourseSchema.plugin(mongooseDelete, { overrideMethods: "all" });
const CourseModel = model("Course", CourseSchema);

module.exports = CourseModel;
//Esquema Course
