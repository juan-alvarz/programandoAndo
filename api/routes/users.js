const {Router} = require('express')
const router = Router();
const { getAllUsers, createUser, getUserById } = require('../controllers/users')

module.exports = router

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

// router.put('/')