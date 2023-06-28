const CustomAPIError = require('../error-handlers/custom-api');
const catchAsync = require('../utils/catchAsync');
const Task = require('../models/taskModel');

exports.createTask = catchAsync( async(req, res, next) => {
    const newTask = await Task.create({
        title: req.body.title,
        description: req.body.description,
        points: req.body.points,
        rewards: req.body.rewards,
        assignedTo: req.body.assignedTo
    })
    if(!newTask){
        return next(new CustomAPIError('Could not create Task', 400));
    }
    // console.log(newTask);
    
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
    
  
    // console.log(tasks);
    
    res.status(200).json({ 
        status: 'success',
        data: {
            data: tasks,
            count: tasks.length
        }
    });
    next();
});

exports.getTask = catchAsync( async(req, res, next) => {
    
    const task = await Task.findById(req.params.id).populate('assignedTo');
    if(!task){
        return next(new CustomAPIError('Could not find task', 400));
    }
    
    res.status(200).json({ 
        status: 'success',
        data: {
            task
        }
    });
    next();
});

exports.updateTask = catchAsync( async(req, res, next) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    
    if(!task){
        return next(new CustomAPIError('Could not find task', 400));
    }
    
    res.status(200).json({ 
        status: 'success',
        data: {
            task
        }
    });
    next();
});

exports.deleteTask = catchAsync( async(req, res, next) => {
    const task = Task.findByIdAndRemove(req.params.id);
    
    if(!task){
        return next(new CustomAPIError('Could not find task', 400));
    }
    
    res.status(200).json({ 
        status: 'success',
        data: null,
    });
    next();
});