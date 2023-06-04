const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tasks: [
        {
            taskId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Tasks',
            },
            isCompleted: {
                type: Boolean,
            }
        }
    ],
    rewards: [
        {
            rewardId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Awards',
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

const Child = mongoose.model('Child', childSchema);

module.exports = Child;