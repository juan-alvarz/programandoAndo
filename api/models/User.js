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
    authorizeNotifications: {
      type: Boolean,
    },
    password: {
      type: String,
      select: false,
    },
    biography: {
      type: String,
    },
    preferences: {
      type: String,
      enum: [
        "front-end",
        "back-end",
        "databases",
        "allSchools",
        "data science",
        "MERN route",
        "PERN route",
        "design UX/UI",
      ],
      default: "allSchools",
    },
    isWorking: {
      type: Boolean,
      default: false,
    },
    studyStatus: {
      type: String,
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
      enum: ["english", "spanish"],
      default: "english",
    },
    country: {
      type: String,
      default: "",
    },
    birthday: {
      type: Date,
      default: Date.now(),
    },
    ownPath: [
      {
        type: Schema.Types.ObjectId,
        ref: "School",
      },
    ],
    scoring: [
      {
        course: { type: Schema.Types.ObjectId, ref: "Course" },
        score: Number,
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
    status: {
      type: String,
      enum: ["pending", "active"],
      default: "pending",
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
    changePassCode: {
      type: String,
    },

    chats: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
    pagePuntuation: {
      type: Number,
      default: 0,
    },
    pageOpinion: {
      type: String,
      default: "",
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
