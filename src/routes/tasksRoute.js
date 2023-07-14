const express = require('express');
const taskController = require('../controllers/tasksController');
const router = express.Router();
const authController = require('../controllers/authController');

router.route('/').post(authController.restrictToParents, taskController.createTask).get(taskController.getAllTasks)

router.route('/:id').get(taskController.getTask).patch(taskController.updateTask).delete(authController.restrictToParents, taskController.deleteTask);

router.route('/:id/isCompleted').patch(taskController.completedTask);

module.exports = router;