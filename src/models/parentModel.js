const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name']
    },
    userName: {
        type: String,
        required: [true, 'Please provide user name']
    },
    email: {
        type: String,
        required: [true, 'Please provide email address'],
        unique: true, 
        lowercase: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [6, 'Password must be at least 6 characters long'],
        trim: true,
    },
    children: [
        {
            childId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Child',
            },
            userName: {
                type: String
            }
        }
    ]
});

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;