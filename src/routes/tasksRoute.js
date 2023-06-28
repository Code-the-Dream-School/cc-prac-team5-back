const express = require('express');

const taskController = require('../controllers/tasksController');

const router = express.Router();

router.route('/').post(taskController.createTask).get(taskController.getAllTasks)

router.route('/:id').get(taskController.getTask).patch(taskController.updateTask).delete(taskController.deleteTask);




module.exports = router;