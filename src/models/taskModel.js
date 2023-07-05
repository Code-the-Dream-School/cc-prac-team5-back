const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide task title'],
    },
    description: {
        type: String,
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
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'child'
    },
    isApproved: {
        type: Boolean,
        enum: [true, false],
        default: false
    },  
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
}
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;