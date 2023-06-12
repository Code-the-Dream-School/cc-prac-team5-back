const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const parentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name']
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
        select: false,
    },
    children: [
        {
        type: mongoose.Schema.ObjectId,
        ref: 'Children',
        }
    ],
    rewards: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Reward',
        }
    ]
});

parentSchema.pre('save', async function(next){
    //if password has been changed
    if(!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

//create an instance method - will be available for all documents of this collection
parentSchema.methods.correctPassword = async function(
    candidatePassword, 
    userPassword) {
        const isMatch = await bcrypt.compare(candidatePassword, userPassword);
        return isMatch;
};

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;