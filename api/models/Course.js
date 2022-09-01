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
      type: Schema.Types.ObjectId,
      ref: 'Video'
    },
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