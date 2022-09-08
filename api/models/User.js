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
    language: {
      type: String,
    },
    country: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    ownPath: [
      {
        type: Schema.Types.ObjectId,
        ref: "School",
      },
    ],
    scoring: {
      type: Schema.Types.ObjectId,
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    contributor: {
      type: Number,
      default: 0,
    },
    banned: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "active"],
      default: "pending",
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
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
