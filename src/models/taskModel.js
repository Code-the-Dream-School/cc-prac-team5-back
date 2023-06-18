const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: 'String',
        required: [true, 'Please provide task title'],
    },
    description: {
        type: 'String',
        required: [true, 'Please provide task description'],
    },
    points: {
        type: Number,
        required: true
    },
    rewards: [
        {
            rewardId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Rewards',
            },
            receivedAt: {
                type: Date
            }
        }
        
    ],
    createdAt: Date,
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'child'
    },
    completedAt: Date,
    isApproved: false,  
});

const Task = mongoose.Model('Task', taskSchema);

modules.exports = Task;