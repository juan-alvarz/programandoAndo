const { schoolModel, courseModel } = require('../models')

// ============================= GET SCHOOLS DATABASE ========================

const getAllSchool = async (req, res) => {
    const { name } = req.query
    const data = await schoolModel.find({}).populate({
        path: 'courses',
        populate: {
            path: 'videos'
        }
    }) //.populate('videos')
    // data = JSON.parse(data)
    try {
        if (name) {
            const find = await schoolModel.findOne({ name: name })
            if (!find) {
                res.send({ msg: "School doesnt exist" })
            } else {
                res.send(find)
            }
        } else {
            res.send(data)
        }
    } catch (error) {
        console.log(error)
    }
}

// ============================= GET ID SCHOOL ================================

const getSchoolId = async (req, res) => {
    const { id } = req.params

    try {
        if (!id) {
            res.send({ msg: "ID its necessary" })
        } else {
            const find = await schoolModel.findById(id)
            if (!find) {
                res.send({ msg: "School doesnt exist" })
            } else {
                res.send(find)
            }
        }

    } catch (error) {
        console.log(error)
    }
}
// ===========================CREATE SCHOOL ====================================

const createSchool = async (req, res) => {
    const { name, description, courses, image } = req.body

    const find = await schoolModel.findOne({ name: name })

    if (!find) {
        const created = await schoolModel.create({
            name,
            description,
            courses,
            image,
        })
        res.send(created)
    } else {
        res.send({ msg: "School already exist" })
    }
}

module.exports = { getAllSchool, getSchoolId, createSchool }