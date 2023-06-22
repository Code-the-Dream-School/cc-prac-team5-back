const express = require('express');

const authController = require('../controllers/authController');


const { getParents, getCurrentParent, updateParent, deleteParent } = require('../controllers/userController/parentController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/createChild',authController.restrictToParents, authController.createChild);


router.route('/').get(getParents);

router.route('/:id').get(getCurrentParent).patch(updateParent).delete(deleteParent);

module.exports = router;


