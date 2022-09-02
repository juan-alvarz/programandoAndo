const {matchedData} = require ('express-validator')
const {courseModel} = require ('../models')
const { handleHttpError } = require('../utils/handleError');


// OBTENER LISTA DE CURSOS DE LA BASE DE DATOS
const getCourses = async (req, res) => {
    const {name} = req.query
    try {
        if (name) {
            const find = await courseModel.findOne({name:name})
            if(!find){
                res.send({msg: "Course doesnt exist" })         
            }else{
                res.send(find)
            }
        }
        const data = await courseModel.find({}).populate('videos')
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({error: error.message})
    } 
}

// OBTENER DETALLE DE UN CURSO DE LA BASE DE DATOS
const getCourseById = async (req, res) => {
    try {
     //   req = matchedData(req);
        const {id} = req.params;
        if (id) {
            const data = await courseModel.findById(id).populate('videos');
            if (!data) {
                res.send('ID inexistente')
            } else {
                res.status(200).json(data);
            }
        }
        res.status().json({message: 'Es necesario el ID'})
   } catch (error) {
            handleHttpError(res, 'ERROR_GET_COURSE')
   }
}

// CREAR CURSO EN LA BASE DE DATOS
const createCourse = async (req, res) => {
    try {
        const {name, description, videos, image} = req.body
    // console.log(body)
        await courseModel.create({name, description, videos, image})
        res.status(200).send("Curso creado")
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}


module.exports = { getCourses, createCourse, getCourseById };