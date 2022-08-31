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
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
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

const SchoolModel = model("School", SchoolSchema);

module.exports = SchoolModel;
