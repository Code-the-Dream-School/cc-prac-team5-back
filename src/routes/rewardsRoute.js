const express = require('express');

const rewardsController = require('../controllers/rewardsController');

const router = express.Router();

router.route('/').post(rewardsController.createReward)

router.route('/:id').get(rewardsController.getReward).patch(rewardsController.editReward)
.delete(rewardsController.deleteReward);




module.exports = router;