const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
    userName: {
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
    awards: [
        {
            awardId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Awards',
            },
            receivedAt: {
                type: Date
            }
        }
        
    ]
});

const Child = mongoose.model('Child', childSchema);

module.exports = Child;