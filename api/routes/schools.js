const express = require("express")
const router = express.Router();
const {getAllSchool,getSchoolId,createSchool}= require('../controllers/schools')
const {validatorCreateSchool} = require('../validators/schools')

router.get('/',getAllSchool);

router.get('/:id',getSchoolId);

router.post('/',validatorCreateSchool,createSchool);


module.exports = router;