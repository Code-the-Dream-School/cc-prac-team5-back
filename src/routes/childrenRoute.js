const express = require('express');
const multer = require('multer');

const router = express.Router();

const authController = require('../controllers/authController');
const childrenController = require('../controllers/userController/childrenController');

//manage children images

router.post('/createChild', authController.createChild);
router.post('/loginChild', authController.loginChild);


router.route('/').get(childrenController.getAllChildren).post(childrenController.createChild);

router.route('/:id').get(childrenController.getChildById).patch(childrenController.editChild).delete(childrenController.deleteChild);




module.exports = router;