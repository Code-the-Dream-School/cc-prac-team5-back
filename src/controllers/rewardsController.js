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
exports.getAllRewards = catchAsync( async(req, res, next) => {
    const rewards = await Reward.find();
    
    // if(!rewards) {
    //     return next(new CustomAPIError('Could not fetch rewards.', 400));
    // }
    
    res.status(200).json({
        status: 'success',
        data: {
            data: rewards,
            count: rewards.length
        }
    })
    next();
});
// get a single reward based on Id
exports.getReward = catchAsync( async(req, res, next) => {
    const reward = await Reward.findById(req.params.id);
    
    if(!reward) {
        return next(new CustomAPIError('Could not find specified reward.', 400));
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            data: reward
        }
    })
    next();
});
// update a reward
exports.editReward = catchAsync( async(req, res, next) =>{
    const reward = await Reward.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    
    if(!reward) {
        return next(new CustomAPIError('Could not update reward.', 400));
    }
    
    res.status(200).json({ 
        status: 'success',
        data: {
            reward
        }
    });
    next();
})

// delete a reward
exports.deleteReward = catchAsync( async(req, res, next) =>{
    const reward = await Reward.findByIdAndRemove(req.params.id)
    
    if(!reward) {
        return next(new CustomAPIError('Could not delete reward.', 400));
    }
    
    res.status(200).json({ 
        status: 'success',
        data: null
    });
    next();
})