const CustomAPIError = require('../error-handlers/custom-api');
const catchAsync = require('../utils/catchAsync');
const Task = require('../models/taskModel');

exports.createTask = catchAsync( async(req, res, next) => {
    const newTask = await Task.create({
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    })
    
    console.log(newTask);
    
    res.status(201).json({ 
        status: 'success',
        data: {
            task: newTask
        }
    })
    next();
});

exports.getAllTasks = catchAsync(async (req, res, next) => {
    const tasks = await Task.find().sort('createdAt');
    console.log(tasks);
    
    res.status(200).json({ 
        status: 'success',
        data: {
            data: tasks,
            count: tasks.length
        }
    });
    next();
});

exports.getTask = (req, res) => {
    res.status(500).json({ 
        status: 'error',
        message: 'This route has not been defined.'
    });
};

exports.updateTask = (req, res) => {
    res.status(500).json({ 
        status: 'error',
        message: 'This route has not been defined.'
    });
};

exports.deleteTask = (req, res) => {
    res.status(500).json({ 
        status: 'error',
        message: 'This route has not been defined.'
    });
};

exports.getCompletedTasks = (req, res) => {
    res.status(500).json({ 
        status: 'error',
        message: 'This route has not been defined.'
    });
};