const { courseModel, schoolModel, videoModel } = require("../models");
const { handleHtppError } = require("../utils/handleError");
const { durationCourse } = require("../utils/durationSort.js");
// OBTENER LISTA DE CURSOS DE LA BASE DE DATOS
const getCourses = async (req, res) => {
  const { name } = req.query;
  const { user } = req; // para saber el user que esta consumiendo esta ruta

  const data = await courseModel.find({}).populate("videos");
  try {
    const { name } = req.query;
    if (name) {
      const nombre = await courseModel
        .find({ name: { $regex: "." + name + ".", $options: "<i>" } })
        .populate("videos");
      console.log(nombre);
      if (!nombre.length) {
        res.send({ msg: "error" });
      } else {
        res.send(nombre);
      }
    } else {
      res.status(200).send(data);
      // res.status(200).send({ data, user }); // Saber que usuario ha entrado a la ruta
    }
  } catch (e) {
    console.log(e.message);
    // res.status(404).send({ msg: e.message });
    handleHtppError(res, e.message, 404);
  }
};

// OBTENER DETALLE DE UN CURSO DE LA BASE DE DATOS POR MEDIO DEL ID
const getCourseById = async (req, res) => {
  try {
    if (!id) {
      res.send({ msg: "The ID is necessary" });
    } else {
      const courseId = await courseModel.findById(id).populate("videos");
      if (!courseId) {
        res.send({ message: `The Course with the: ${id} does not exist` });
      } else {
        res.status(200).send(courseId);
      }
    }
  } catch (error) {
    handleHtppError(res, "ERROR_GET_COURSE", 404);
  }
};

// CREAR CURSO EN LA BASE DE DATOS
const createCourse = async (req, res) => {
  const { name, description, image, videos } = req.body;

  // const body = req.body;
  const find = await schoolModel.findOne({ name: name });

  const videosFind = await Promise.all(
    videos.map(async (video) => {
      return await videoModel.findById(video);
    })
  );
  const duration = durationCourse(videosFind);

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
  const { id } = req.params;
  const body = req.body;
  try {
    const actualizado = await courseModel.updateOne({ _id: id }, body);
    if (!actualizado.modifiedCount) {
      res.status(422).send("Fail in the query");
    }
    res.status(201).send("The Course was updated");
  } catch (error) {
    res.status(404).send({ msg: "The Course could not be updated" });
  }
};

const softDeleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await courseModel.delete({ _id: id });
    res.status(200).send(deleted);
  } catch (error) {
    res.json(error.message);
  }
};
// PATCH!!
const restoreCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const restored = await courseModel.restore({ _id: id });
    res.status(200).send(restored);
  } catch (error) {
    res.status(400).send(error.message);
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
