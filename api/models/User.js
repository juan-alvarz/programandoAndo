const { Schema, model } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    schools: [
      {
        type: Schema.Types.ObjectId,
        ref: "School",
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin", "owner"],
      default: "user",
    },
    // favorites: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Course",
    //   },
    // ],
    contributor: {
      type: Boolean,
      default: false,
    },
    banned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.plugin(mongooseDelete, { overrideMethods: "all" });

const UserModel = model("User", UserSchema);

module.exports = UserModel;
//esquema User
