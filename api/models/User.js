const { Schema, model } = require("mongoose");
const mongooseDelete = require('mongoose-delete');

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
    },
    schools: [
      {
        type: Schema.Types.ObjectId,
        ref: "School",
      },
    ],

    contributor: { type: Boolean },
    banned: { type: Boolean },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

const UserModel = model("User", UserSchema);

module.exports = UserModel;
//esquema User
