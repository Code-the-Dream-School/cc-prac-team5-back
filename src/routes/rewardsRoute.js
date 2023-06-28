const express = require('express');

const rewardsController = require('../controllers/rewardsController');

const router = express.Router();

router.route('/').post(rewardsController.createReward)

// router.route('/:id').get(taskController.getTask).patch(taskController.updateTask).delete(taskController.deleteTask);




module.exports = router;