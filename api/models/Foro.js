const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const Video = require("./Video.js");
const mongooseDelete = require("mongoose-delete");

const ForoSchema = new Schema(
  {
    comments: [
      {
        authorComment: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        content: String,
        answers: [
          {
            authorComment: {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
            content: String,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ForoSchema.plugin(mongooseDelete, { overrideMethods: "all" });
const ForoModel = model("Foro", ForoSchema);

module.exports = ForoModel;
//Esquema Foro
