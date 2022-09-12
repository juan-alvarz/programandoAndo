const { foroModel, usersModel } = require("../models/index");
const { handleHttpError } = require("../utils/handleError");

const getForos = async (req, res) => {
  try {
    let data = await foroModel
      .find({})
      .populate({
        path: "comments",
        populate: {
          path: "authorComment",
          select: "name",
          // path: "answers",
          // populate: {
          //     path: "authorComment"
          // }
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "answers",
          populate: {
            path: "authorComment",
            select: "name",
          },
        },
      }); // .populate("idVideo")
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};

const getForoById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.send({ msg: "The ID is necessary" });
    } else {
      const notificationId = await foroModel
        .findById(id)
        .populate({
          path: "comments",
          populate: {
            path: "authorComment",
            select: "name",
          },
        })
        .populate({
          path: "comments",
          populate: {
            path: "answers",
            populate: {
              path: "authorComment",
              select: "name",
            },
          },
        }); //.populate("idVideo")
      if (!notificationId) {
        res.send({ message: `The foro with the: ${id} does not exist` });
      } else {
        res.status(200).send(notificationId);
      }
    }
  } catch (error) {
    console.log(error);
    /* handleHttpError(res, "ERROR_GET_FORO"); */
  }
};

const createForo = async (req, res) => {
  const { comments } = req.body;
  try {
    const creado = await foroModel.create({
      comments,
    });
    res.status(200).send(creado);
  } catch (error) {
    res.send({ msg: "The Foro Could not be created" });
  }
};
/* 
  {
    "authorComment": "63127d65452e091676932e21",
    "content": "asdfsafsafasfasdfsa"
  }
  */
const updateForo = async (req, res) => {
  const { id } = req.params;
  const { commentId, ...body } = req.body;
  try {
    const foro = await foroModel.findById(id);
    if (commentId) {
      const data = foro.comments.filter((x) => x._id.toString() === commentId);
      data[0]["answers"] = data[0]["answers"].concat(body);
      foro.save();
      return res.status(201).json(foro);
    }
    foro.comments = foro.comments.concat(body);
    foro.save();
    return res.status(201).send(foro);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const softDeleteForo = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await foroModel.delete({ _id: id });
    res.status(200).send(deleted);
  } catch (error) {
    res.json(error.message);
  }
};

// PATCH!!
const restoreForo = async (req, res) => {
  const { id } = req.params;
  try {
    const restored = await foroModel.restore({ _id: id });
    res.status(200).send(restored);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getForos,
  createForo,
  getForoById,
  updateForo,
  softDeleteForo,
  restoreForo,
};
