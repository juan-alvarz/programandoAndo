const express = require("express");
const {
    createForo,
    getForoById,
    updateForo,
    softDeleteForo,
    restoreForo,
    getForos,
} = require("../controllers/foro");
const {
    validatorGetorCreateForo,
    validatorGetForoById
} = require("../validators/foros");

const router = express.Router();

// VAMOS A GENERAR LA RUTA DE LOS CURSOS -- CRUD EN LA PRIMERA FASE GETALL GETBYID Y CREATE

router.get("/", getForos);

router.get("/:id", getForoById);

router.post("/", validatorGetorCreateForo, createForo);

router.put("/:id", updateForo);

router.delete("/:id", softDeleteForo);

router.patch("/:id", restoreForo);

module.exports = router;
