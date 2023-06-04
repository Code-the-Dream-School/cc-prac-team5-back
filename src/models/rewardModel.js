const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
    title: String,
    description: String,
    points: Number
});

const Award = mongoose.model('Award', awardSchema);

modules.export = Award;