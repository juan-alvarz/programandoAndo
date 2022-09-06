const { Schema, model } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const SchoolSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    image: {
      type: String,
    },
    isCustom: {
      type: Boolean
    },
    score: {
      type: mongoose.Decimal128,
      get: v => new mongoose.Types.Decimal128((+v.toString()).toFixed(1)),
      default: 0
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

SchoolSchema.plugin(mongooseDelete, { overrideMethods: "all" });

const SchoolModel = model("School", SchoolSchema);
// model School
module.exports = SchoolModel;
