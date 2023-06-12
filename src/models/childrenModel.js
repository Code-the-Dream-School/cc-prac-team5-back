const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        select: false,
    },
    image: {
        type: String,
        default: 'default.jpg',
    },
    tasks: [
        {
            taskId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Tasks',
            },
            isCompleted: {
                type: [Boolean, false],
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
});

childrenSchema.pre('save', async function(next) {
    //if password has been changed
    if(!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12);
})

const Children = mongoose.model('Children', childrenSchema);

module.exports = Children;