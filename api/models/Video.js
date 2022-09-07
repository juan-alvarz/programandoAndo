const { Schema, model, Types } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const VideoSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    author: {
      type: String,
    },
    profile: {
      type: String,
    },
    duration: {
      type: String,
    },
    difficult: {
      type: String,
      enum: ["principiante", "intermedio", "avanzado"],
      default: "principiante",
    },
    url: {
      type: String,
    },
    foro: {
       type: Schema.Types.ObjectId,
       ref: 'Foro'
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

VideoSchema.plugin(mongooseDelete, { overrideMethods: "all" });

const VideoModel = model("Video", VideoSchema);

module.exports = VideoModel;
//esquema video
