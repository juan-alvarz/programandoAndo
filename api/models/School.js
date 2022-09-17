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
      url: {
        type: String
      },
      public_id: {
        type: String
      }
    },
    custom: {
      type: Boolean,
      default: false,
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
