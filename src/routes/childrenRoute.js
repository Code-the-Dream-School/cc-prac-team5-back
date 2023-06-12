const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');

router.post('/createChild', authController.createChild);

const childrenController = require('../controllers/userController/childrenController');

router.route('/').get(childrenController.getAllChildren).post(childrenController.createChild);

router.route('/:id').get(childrenController.getChildById).patch(childrenController.editChild).delete(childrenController.deleteChild);




module.exports = router;