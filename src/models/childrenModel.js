const mongoose = require('mongoose');

const childrenSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [6, 'Password must be at least 6 characters long'],
        trim: true,
    },
    tasks: [
        {
            taskId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Tasks',
            },
            isCompleted: {
                type: false,
            }
        }
    ],
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
    image: {
        type: String,
        default: 'default.jpg',
    },
});

const Children = mongoose.model('Children', childrenSchema);

module.exports = Children;