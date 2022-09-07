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
    validatorGetorCreateForo
} = require("../validators/foros");

const router = express.Router();

// VAMOS A GENERAR LA RUTA DE LOS CURSOS -- CRUD EN LA PRIMERA FASE GETALL GETBYID Y CREATE

router.get("/", getForos);

router.get("/:id", getForoById);

router.post("/", validatorGetorCreateForo, createForo);

router.put("/:id", updateForo);

router.delete("/:id", validatorGetorCreateForo, softDeleteForo);

router.patch("/:id", validatorGetorCreateForo, restoreForo);

module.exports = router;
