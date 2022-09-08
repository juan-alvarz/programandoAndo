const { Schema, model } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const UserSchema = new Schema(
  {
    name: {
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
    foros: [
      {
        type: Schema.Types.ObjectId,
        ref: "Foro",
      },
    ],
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
    role: {
      type: String,
      enum: ["owner", "admin", "user"],
      default: "user",
    },
    userName: {
      type: String,
      unique: true,
    },
    ownPath: [
      {
        type: Schema.Types.ObjectId,
        ref: "School",
      },
    ],
    language: {
      type: String,
      enum: ["english", "spanish"],
      default: "english",
    },
    country: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    image: {
      type: String,
    },
    scoring: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
    },
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