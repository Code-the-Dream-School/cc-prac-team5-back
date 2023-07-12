const express = require('express');
const authController = require('../controllers/authController');

const rewardsController = require('../controllers/rewardsController');

const router = express.Router();

router.route('/').post(authController.restrictToParents, rewardsController.createReward).get(rewardsController.getAllRewards)

router.route('/:id').get(rewardsController.getReward).patch(authController.restrictToParents, rewardsController.editReward)
.delete(authController.restrictToParents, rewardsController.deleteReward);




module.exports = router;