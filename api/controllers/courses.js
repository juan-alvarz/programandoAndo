const { matchedData } = require('express-validator')
const { courseModel } = require('../models')
const { handleHttpError } = require('../utils/handleError');


// OBTENER LISTA DE CURSOS DE LA BASE DE DATOS
const getCourses = async (req, res) => {
    const data = await courseModel.find({}).populate('videos')

    res.status(200).send(data)
}

// OBTENER DETALLE DE UN CURSO DE LA BASE DE DATOS
const getCourseById = async (req, res) => {
    try {
        //   req = matchedData(req);
        const { id } = req.params;
        const data = await courseModel.findById(id).populate('videos');
        res.json(data);
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_COURSE')
    }
}

// CREAR CURSO EN LA BASE DE DATOS
const createCourse = async (req, res) => {
    const body = req.body
    const data = await courseModel.create(body)
    res.json(data)
}


module.exports = { getCourses, createCourse, getCourseById };