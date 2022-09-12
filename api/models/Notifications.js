const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const Video = require("./Video.js");
const mongooseDelete = require("mongoose-delete");

const NotificationsSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
<<<<<<< HEAD
    expireAt: { type: Date,  expires: 432000, default: Date.now }
=======
    expireAt: { type: Date, expires: 432000, default: Date.now },
>>>>>>> Fran
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// NotificationsSchema.index({createdAt: 1}, {expireAfterSeconds: 120});
NotificationsSchema.plugin(mongooseDelete, { overrideMethods: "all" });
const NotificationsModel = model("Notifications", NotificationsSchema);

module.exports = NotificationsModel;
<<<<<<< HEAD
//Esquema Notifications
=======
//Esquema Notifications
>>>>>>> Fran
