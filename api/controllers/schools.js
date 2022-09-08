const { schoolModel } = require("../models");

// ============================= GET SCHOOLS DATABASE ========================

const getAllSchool = async (req, res) => {
  const { name } = req.query;
  const data = await schoolModel.find({}).populate({
    path: "courses",
    populate: {
      path: "videos",
    },
  });
  try {
    if (name) {
      const nombre = await schoolModel
        .find({ name: { $regex: ".*" + name + ".*", $options: "<i>" } })
        .populate({
          path: "courses",
          populate: {
            path: "videos",
          },
        });
      // const nombre = data.filter(
      //   e => e.name.toLowerCase().includes(name.toLowerCase()))
      console.log(nombre);
      if (!nombre) {
        res.send({ msg: "School doesnt exist" });
      } else {
        res.send(nombre);
      }
    } else {
      res.send(data);
    }
  } catch (error) {
    console.log(error);
  }
};

// ============================= GET ID SCHOOL ================================

const getSchoolId = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.send({ msg: "ID its necessary" });
    } else {
      const find = await schoolModel.findById(id).populate({
        path: "courses",
        populate: {
          path: "videos",
        },
      });
      if (!find) {
        res.send({ msg: "School doesnt exist" });
      } else {
        res.send(find);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// ===========================CREATE SCHOOL ====================================

const createSchool = async (req, res) => {
  const { name, description, courses, image } = req.body;

  const find = await schoolModel.findOne({ name: name });

  if (!find) {
    const created = await schoolModel.create({
      name,
      description,
      courses,
      image,
    });
    res.send(created);
  } else {
    res.send({ msg: "School already exist" });
  }
};

// ===========================UPDATE SCHOOL ====================================

const updateSchool = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const actualizado = await schoolModel.updateOne({ _id: id }, body);
    if (!actualizado.modifiedCount) {
      res.status(422).send("Fail in the query");
    }
    res.status(201).send("The School was updated");
  } catch (error) {
    res.status(404).send({ msg: "The School could not be updated" });
  }
};

// ===========================SOFTDELETE SCHOOL ====================================

const softDeleteSchool = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await schoolModel.delete({ _id: id });
    res.status(200).send(deleted);
  } catch (error) {
    res.json(error.message);
  }
};

// ===========================RESTORE SCHOOL ====================================

const restoreSchool = async (req, res) => {
  const { id } = req.params;
  try {
    const restored = await schoolModel.restore({ _id: id });
    res.status(200).send(restored);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllSchool,
  getSchoolId,
  createSchool,
  restoreSchool,
  softDeleteSchool,
  updateSchool,
};
