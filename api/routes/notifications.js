<<<<<<< HEAD
const express = require("express");
const {
  getNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  softDeleteNotification,
  restoreNotification,
} = require("../controllers/notifications");
const {
    validatorCreateNotification, 
    validatorGetNotification
} = require("../validators/notifications");

const router = express.Router();

// VAMOS A GENERAR LA RUTA DE LOS CURSOS -- CRUD EN LA PRIMERA FASE GETALL GETBYID Y CREATE

router.get("/", getNotifications);

router.get("/:id", validatorGetNotification, getNotificationById);

router.post("/", validatorCreateNotification, createNotification);

router.put("/:id", validatorGetNotification, updateNotification);

router.delete("/:id", validatorGetNotification, softDeleteNotification);

router.patch("/:id", validatorGetNotification, restoreNotification);

module.exports = router;
=======
const express = require("express");
const {
  getNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  softDeleteNotification,
  restoreNotification,
} = require("../controllers/notifications");
const {
    validatorCreateNotification, 
    validatorGetNotification
} = require("../validators/notifications");

const router = express.Router();

// VAMOS A GENERAR LA RUTA DE LOS CURSOS -- CRUD EN LA PRIMERA FASE GETALL GETBYID Y CREATE

router.get("/", getNotifications);

router.get("/:id", validatorGetNotification, getNotificationById);

router.post("/", validatorCreateNotification, createNotification);

router.put("/:id", validatorGetNotification, updateNotification);

router.delete("/:id", validatorGetNotification, softDeleteNotification);

router.patch("/:id", validatorGetNotification, restoreNotification);

module.exports = router;
>>>>>>> Fran
