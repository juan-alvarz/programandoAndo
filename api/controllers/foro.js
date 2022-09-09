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
<<<<<<< HEAD
=======
          // path: "answers",
          // populate: {
          //     path: "authorComment"
          // }
>>>>>>> Roge
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
<<<<<<< HEAD
      });
    return res.status(200).json(data);
=======
      }); // .populate("idVideo")
    res.status(200).json(data);
>>>>>>> Roge
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
<<<<<<< HEAD
        });
      // if (!notificationId) {
      //   res.send({ message: `The foro with the: ${id} does not exist` });
      // } else {
      //   res.status(200).send(notificationId);
      // }
      console.log(notificationId);
      return res.status(200).send(notificationId);
=======
        }); //.populate("idVideo")
      if (!notificationId) {
        res.send({ message: `The foro with the: ${id} does not exist` });
      } else {
        res.status(200).send(notificationId);
      }
>>>>>>> Roge
    }
  } catch (error) {
    handleHttpError(res, "ERROR_GET_FORO");
  }
};

const createForo = async (req, res) => {
<<<<<<< HEAD
  const { comments, idVideo } = req.body;
  try {
    const creado = await foroModel.create({
      comments,
      idVideo,
=======
  const { comments } = req.body;
  try {
    const creado = await foroModel.create({
      comments,
>>>>>>> Roge
    });
    res.status(200).send(creado);
  } catch (error) {
    res.send({ msg: "The Foro Could not be created" });
  }
};
<<<<<<< HEAD

=======
/* 
  {
    "authorComment": "63127d65452e091676932e21",
    "content": "asdfsafsafasfasdfsa"
  }
  */
>>>>>>> Roge
const updateForo = async (req, res) => {
  const { id } = req.params;
  const { commentId, ...body } = req.body;
  try {
    const foro = await foroModel.findById(id);
    if (commentId) {
      const data = foro.comments.filter((x) => x._id.toString() === commentId);
      data[0]["answers"] = data[0]["answers"].concat(body);
      foro.save();
      return res.status(201).json("answere was update");
    }
    foro.comments = foro.comments.concat(body);
    foro.save();
    return res.status(201).send("Foro updated");
  } catch (error) {
    res.status(404).json(error.message);
  }
<<<<<<< HEAD
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

=======
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

>>>>>>> Roge
module.exports = {
  getForos,
  createForo,
  getForoById,
  updateForo,
  softDeleteForo,
  restoreForo,
};
