const {Router} = require('express')
const router = Router();
const { getAllUsers, createUser, getUserById } = require('../controllers/users');
const validatorCreateUser = require('../validators/users')

module.exports = router

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', validatorCreateUser, createUser);

// router.put('/')