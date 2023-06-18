const express = require('express');

const { createTask, getTask, updateTask, deleteTask, getAllTasks, getCompletedTasks } = require('../controllers/tasksController');

const router = express.Router();

router.route('/').get(getAllTasks).post(createTask);

router.route('/:id').get(getTask).get(getCompletedTasks).patch(updateTask).delete(deleteTask);




module.exports = router;