const express = require('express')
const { getCourses, getCourseById, createCourse } = require('../controllers/courses')
const router = express.Router()

// VAMOS A GENERAR LA RUTA DE LOS CURSOS -- CRUD EN LA PRIMERA FASE GETALL GETBYID Y CREATE

router.get('/', getCourses);

router.get('/:id', getCourseById);

router.post('/', createCourse)

module.exports = router