const express = require('express')
const { getCourses, getCourseById, createCourse } = require('../controllers/courses')
const router = express.Router()
const {validatorCreateCourse, validatorGetCourse} = require('../validators/courses')


// VAMOS A GENERAR LA RUTA DE LOS CURSOS -- CRUD EN LA PRIMERA FASE GETALL GETBYID Y CREATE

router.get('/', getCourses);

router.get('/:id',validatorGetCourse, getCourseById);

router.post('/',validatorCreateCourse, createCourse)

module.exports = router