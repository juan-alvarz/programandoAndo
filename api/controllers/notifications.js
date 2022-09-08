const { notificationModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const NotificationsModel = require("../models/Notifications");
// OBTENER LISTA DE NOTIFICACIONES DE LA BASE DE DATOS


const getNotifications = async (req, res) => {

  const { name } = req.query;
 
  const data = await notificationModel.find({})
  try {
    if (name) {
      const nombre = await notificationModel
        .find({ name: { $regex: ".*" + name + ".*", $options: "<i>" } })
      console.log(nombre);
      if (!nombre.length) {
        res.send({ msg: "error" });
      } else {
        res.send(nombre);
      }
    } else {
      res.status(200).send(data);
      // res.status(200).send({ data, user });
    }
  } catch (error) {
    console.log(error);
  }
};



// OBTENER DETALLE DE UN CURSO DE LA BASE DE DATOS POR MEDIO DEL ID
const getNotificationById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.send({ msg: "The ID is necessary" });
    } else {
      const notificationId = await NotificationsModel.findById(id)
      if (!notificationId) {
        res.send({ message: `The notification with the: ${id} does not exist` });
      } else {
        res.status(200).send(notificationId);
      }
    }
  } catch (error) {
    handleHttpError(res, "ERROR_GET_NOTIFICATION");
  }
};



// CREAR CURSO EN LA BASE DE DATOS
const createNotification = async (req, res) => {
  const { title, description } = req.body;

  // const body = req.body;
  const find = await notificationModel.findOne({ title: title });

  try {
    if (!find) {
      const creado = await notificationModel.create({
        title,
        description,
      });
      res.send(creado);
    } else {
      res.send({ msg: "The notification already exist" });
    }
  } catch (error) {
    res.send({ msg: "The notification already exist, try with other name" });
  }
};

// ELIMINAR CURSO

// ACTUALIZAR CURSO

/*
 */

const updateNotification = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const actualizado = await notificationModel.updateOne({ _id: id }, body);
    if (!actualizado.modifiedCount) {
      res.status(422).send("Fail in the query");
    }
    res.status(201).send("The Notification was updated");
  } catch (error) {
    res.status(404).send({ msg: "The Notification could not be updated" });
  }
};

const softDeleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await notificationModel.delete({ _id: id });
    res.status(200).send(deleted);
  } catch (error) {
    res.json(error.message);
  }
};


// RESTAURAR!! --> VIA PATCH!!
const restoreNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const restored = await notificationModel.restore({ _id: id });
    res.status(200).send(restored);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getNotifications,
  createNotification,
  getNotificationById,
  updateNotification,
  softDeleteNotification,
  restoreNotification,
};
