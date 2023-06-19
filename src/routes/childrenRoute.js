const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const childrenController = require('../controllers/userController/childrenController');

router.post('/createChild',authController.restrict, authController.createChild);
router.post('/loginChild', authController.loginChild);

router.route('/').get(childrenController.getAllChildren);

router.patch('/updateMe', authController.restrict, childrenController.uploadImage, childrenController.updateMe);

router.route('/:id').get(childrenController.getChildById).patch(childrenController.editChild).delete(childrenController.deleteChild);

module.exports = router;