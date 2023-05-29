const express = require('express');

const { registerParent, getParents, getCurrentParent, updateParent, deleteParent } = require('../../controllers/userController/parentController');

const router = express.Router();

router.route('/').get(getParents).post(registerParent);

router.route('/:id').get(getCurrentParent).patch(updateParent).delete(deleteParent);

module.exports = router;


