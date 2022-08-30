const { Schema, model } = require("mongoose");

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    videos: {
      type: Array,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: true,
  }
);

const CourseModel = model("Course", CourseSchema);

module.exports = CourseModel;
