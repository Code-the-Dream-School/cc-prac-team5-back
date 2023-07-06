const CustomAPIError = require('../error-handlers/custom-api');
const catchAsync = require('../utils/catchAsync');
const Task = require('../models/taskModel');
const sendEmail = require('../utils/email');

exports.createTask = catchAsync( async(req, res, next) => {
    const newTask = await Task.create({
        title: req.body.title,
        description: req.body.description,
        points: req.body.points,
        rewards: req.body.rewards,
        assignedTo: req.body.assignedTo,
        createdBy: req.user.id
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
    const tasks = await Task.find().populate('createdBy').sort('createdAt');
    
    if(!tasks) {
        return next(new CustomAPIError('Could not fetch tasks.', 400));
    }
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
    
    const task = await Task.findById(req.params.id)
    .populate('assignedTo')
    .populate({
        path:'rewards.rewardId',
        model: 'Reward',
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

exports.updateTask = catchAsync( async(req, res, next) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    
    if(!task){
        return next(new CustomAPIError('Could update task', 400));
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

exports.completedTask = catchAsync (async (req, res, next) => {
    const task = await Task.findByIdAndUpdate(req.params.id, {isCompleted: true}, {new: true}).populate('assignedTo').populate('createdBy').populate('rewards');
    
    if(!task){
        return next(new CustomAPIError('task not found, cannot update task', 404));
    }
    
    //fetch parent and child details - email and name respectively
    
    console.log(task)
    let parentEmail = task.createdBy.email;
    let childName = task.assignedTo.userName;
    
    console.log(parentEmail);
    //create email
    let emailText = `${childName} has completed task: ${task.title}. Please log in to approve`;
    
    await sendEmail(parentEmail, 'Task Completed', emailText);
    
        res.status(200).json({
            status: 'success',
            data: {
                task,
        }
    }); 
    next();
});
