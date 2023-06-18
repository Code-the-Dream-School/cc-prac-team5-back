const CustomAPIError = require("../../error-handlers/custom-api");
const catchAsync = require("../../utils/catchAsync");
const Parent = require('../../models/parentModel');

const getParents = (req, res) => {
    res.status(500).json({ 
        status: 'error',
        message: 'This route has not been defined.'
    });
};

const getCurrentParent = catchAsync(async (req, res, next) => {
    const parent = await Parent.findById(req.params.id).populate('children');
    
    if(!parent) {
        return next(new CustomAPIError('User not found', 404));
    }
    res.status(200).json({ 
        status: 'success',
        data: {
            parent
        }
    });
});

const updateParent = (req, res) => {
    res.status(500).json({ 
        status: 'error',
        message: 'This route has not been defined.'
    });
};

const deleteParent = (req, res) => {
    res.status(500).json({ 
        status: 'error',
        message: 'This route has not been defined.'
    });
};

module.exports = {
//   registerParent,
  getParents,
  getCurrentParent,
  updateParent,
  deleteParent
}