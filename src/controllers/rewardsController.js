const CustomAPIError = require('../error-handlers/custom-api');
const catchAsync = require('../utils/catchAsync');
const Reward = require('../models/rewardModel');

// create a new reward
exports.createReward = catchAsync(async(req, res, next) => {
    const newReward = await Reward.create({
      title: req.body.title,
      description: req.body.description,
      points: req.body.points
    });
    
    if(!newReward){
        return next(new CustomAPIError('Could not create reward', 400));
        
    }
    
    res.status(201).json({
        status: 'success',
        data: {
            reward: newReward
        }
    })
    next();
});
// get all rewards
// get a single reward based on Id
// update a single reward
// edit a reward
// delete a reward