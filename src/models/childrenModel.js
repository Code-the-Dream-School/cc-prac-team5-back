const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const childrenSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    pin: {
        type: String,
        required: [true, 'Please provide a PIN'],
        minLength: [4, 'PIN must be at least 4 characters long'],
        trim: true,
        select: false,
        match: [/^\d{4}$/, 'Not a valid PIN'],
        // validate: {
        //     validator: function(value) {
        //         return /^\d{4}$/.test(value);
        //     },
        //     message: 'Please enter a valid PIN',
        // },
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
        }
    ],
    totalPoints: {
        type: Number,
        default: 0
    }
});

childrenSchema.pre('save', async function(next) {
    //if pin has been changed
    if(!this.isModified('pin')) return next();
    
    this.pin = await bcrypt.hash(this.pin, 12);
})

childrenSchema.methods.correctPin = async function(
    candidatePin, 
    userPin) {
        const isMatch = await bcrypt.compare(candidatePin, userPin);
        return isMatch;
};

const Children = mongoose.model('Children', childrenSchema);

module.exports = Children;