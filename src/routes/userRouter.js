const express = require('express');

const { createUser, getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;


