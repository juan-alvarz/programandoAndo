const {foroModel, usersModel} = require ('../models/index')
const { handleHttpError } = require("../utils/handleError");

const getForos = async (req, res) => {
    try {
      let data = await foroModel.find({}).populate(
        { path: "comments",
            populate: {
            path: "authorComment",
            select:'name',
      }
    }).populate({
        path: "comments",
        populate: {
            path: "answers",
        populate: {
        path: "authorComment",
        select:'name',
    },
 }
})
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, msg: err.message });
    }
  }

const getForoById = async (req, res) => {
    const { id } = req.params;  
    try {
      if (!id) {
        res.send({ msg: "The ID is necessary" });
      } else {
        const notificationId = await foroModel.findById(id).populate(
            { path: "comments",
                populate: {
                path: "authorComment",
                select:'name',
          }
        }).populate({
            path: "comments",
            populate: {
                path: "answers",
            populate: {
            path: "authorComment",
            select:'name',
        },
     }
    })
        // if (!notificationId) {
        //   res.send({ message: `The foro with the: ${id} does not exist` });
        // } else {
        //   res.status(200).send(notificationId);
        // }
        console.log(notificationId)
        return res.status(200).send(notificationId);
      }
    } catch (error) {
      handleHttpError(res, "ERROR_GET_FORO");
    }
};
  
const createForo = async (req, res) => {
    const { comments, idVideo} = req.body;
    try {
        const creado = await foroModel.create({
          comments,
          idVideo
        });
        res.status(200).send(creado);
    } catch (error) {
      res.send({ msg: "The Foro Could not be created" });
    }
  };
  
const updateForo = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const actualizado = await foroModel.updateOne({ _id: id }, body).populate(
        { path: "comments",
            populate: {
            path: "authorComment",
            select:'name',
      }
    }).populate({
        path: "comments",
        populate: {
            path: "answers",
        populate: {
        path: "authorComment",
        select:'name',
        }
    }
});
if (!actualizado.modifiedCount) {
  res.status(422).send("Fail in te query");
} 
  res.status(200).send("The Foro was updated");
    } catch (error) {
      res.status(404).send({ msg: "Foro not updated" });
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
  