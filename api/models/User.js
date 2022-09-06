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
    contributor: {
      type: Number,
      default: false,
    },
    banned: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["Owner", "Admind", "User"],
      default: "User",
    },
    userName: {
      type: String,
      unique: true
    },
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Notification'
      }
    ],
    ownPath: [
      {
        type: Schema.Types.ObjectId,
        ref: "School",
      },
    ],
    language: {
      type: String
    },
    country: {
      type: String
    },
    birthday: {
      type: Date
    },
    image: {
      type: String
    },
    scoring: {
      type: Schema.Types.ObjectId
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
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
