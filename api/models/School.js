const { Schema, model } = require("mongoose");

const SchoolSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    courses: {
      type: [Schema.Types.ObjectId],
      ref: "Course",
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

const SchoolModel = model("School", SchoolSchema);

module.exports = SchoolModel;
