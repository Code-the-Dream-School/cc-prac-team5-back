const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema(
    {
    title: String,
    description: String,
    points: Number
    },
);

const Reward = mongoose.model('Reward', rewardSchema);

modules.export = Reward;
