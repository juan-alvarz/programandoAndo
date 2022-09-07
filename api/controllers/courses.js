const { courseModel, schoolModel, videoModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { durationCourse } = require('../utils/durationSort')

// OBTENER LISTA DE CURSOS DE LA BASE DE DATOS
const getCourses = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const nombre = await courseModel
        .find({ name: { $regex: ".*" + name + ".*", $options: "<i>" } })
        .populate("videos");
      if (!nombre.length) {
        res.status(404)
        return res.json('course not found');
      }
      return res.json(nombre);
    }
    const data = await courseModel.find({}).populate("videos");
    return res.json(data);
  } catch {
    // res.status(e.response.status)
    return res.json(e.message);
  }
};

// OBTENER DETALLE DE UN CURSO DE LA BASE DE DATOS POR MEDIO DEL ID
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseId = await courseModel.findById(id).populate("videos");
    if (!courseId) {
      res.status(404)
      return res.send({ message: `The Course with the: ${id} does not exist` })
    }
    return res.json(courseId);
  } catch (e) {
    return res.json(e.message);
  }
};

// CREAR CURSO EN LA BASE DE DATOS
const createCourse = async (req, res) => {
  try {
    const videosFind = await Promise.all(
      videos.map(async (video) => {
        return await videoModel.findById(video);
      })
    );
    const duration = durationCourse(videosFind);

    const { name, description, image, videos } = req.body
      const creado = await courseModel.create({
        name,
        description,
        image,
        videos,
        duration,
      });
      return res.json(creado);
  } catch (error) {
    return res.json({ message: error });
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
    res.json(error.message);
  }
};

module.exports = {
  getCourses,
  createCourse,
  getCourseById,
  updateCourse,
  softDeleteCourse,
  restoreCourse,
};
