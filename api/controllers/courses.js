const { courseModel, schoolModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

// OBTENER LISTA DE CURSOS DE LA BASE DE DATOS
const getCourses = async (req, res) => {
  const { name } = req.query

  const data = await courseModel.find({}).populate("videos")
  try {
    if (name) {
      const nombre = await courseModel.find({ name: { $regex: '.*' + name + '.*', $options: '<i>' } }).populate("videos");
      console.log(nombre)
      if (!nombre.length) {
        res.status(404)
        return res.send(`The Course with the name: ${name} does not exist`);
      }
      return res.json(nombre);
    }
    return res.status(200).json(data)

  } catch {
    // res.status(e.response.status)
    return res.json(e.message);
  }
};

// OBTENER DETALLE DE UN CURSO DE LA BASE DE DATOS POR MEDIO DEL ID
const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.send({ msg: 'The ID is necessary' });
    } else {
      const courseId = await courseModel.findById(id).populate("videos");
      if (!courseId) {
        res.send({ message: `The Course with the: ${id} does not exist` })
      } else {
        res.status(200).send(courseId)
      }
    }
  } catch (e) {
    return res.json(e.message);
  }
};

// CREAR CURSO EN LA BASE DE DATOS
const createCourse = async (req, res) => {
  const { name, description, image, videos } = req.body

  // const body = req.body;
  const find = await schoolModel.findOne({ name: name })
  try {
    if (!find) {
      const creado = await courseModel.create({
        name,
        description,
        image,
        videos
      });
      res.send(creado);
    } else {
      res.send({ msg: 'The course already exist' })
    }
  } catch (e) {
    return res.json(e.message);
  }
};

// ELIMINAR CURSO


// ACTUALIZAR CURSO

/*
*/

const updateCourse = async (req, res) => {
  const { id } = req.params
  const body = req.body
  try {
    const actualizado = await courseModel.updateOne({ _id: id }, body)
    if (!actualizado.modifiedCount) {
      res.status(422).send('Fail in the query')
    }
    res.status(201).send('The Course was updated')
  } catch (e) {
    return res.json(e.message);
  }
}

const softDeleteCourse = async (req, res) => {
  const { id } = req.params
  try {
    const deleted = await courseModel.delete({ _id: id });
    res.status(200).send(deleted)
  } catch (error) {
    res.json(error.message)
  }
};
// PATCH!!
const restoreCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const restored = await courseModel.restore({ _id: id });
    res.status(200).send(restored)
  } catch (error) {
    res.status(400).send(error.message)
  }
}


module.exports = { getCourses, createCourse, getCourseById, updateCourse, softDeleteCourse, restoreCourse };
