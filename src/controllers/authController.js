const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Parent = require('../models/parentModel');
const Children = require('../models/childrenModel');
const catchAsync = require('../utils/catchAsync');
const CustomAPIError = require('../error-handlers/custom-api');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}

exports.register = catchAsync (async (req, res, next) => {
    const newParent = await Parent.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    
    const token = signToken(newParent._id)
    
    res.status(201).json({
        status: 'success',
        token,
        data: {
            parent: newParent,
        }
    })
    next();
});

exports.createChild = catchAsync( async (req, res, next) => {
    const newChild = await Children.create({
        userName: req.body.userName,
        pin: req.body.pin,
        parent: req.body.id,
    });
    
    // update children field in parent model
    const updatedParent = await Parent.findByIdAndUpdate(
        req.user.id,
        { 
            $push: 
            { children: newChild._id }
         },
        { 
            new: true,
        }
    );
    
    if(!updatedParent){
        return next(new CustomAPIError('User not found', 404))
    }
    const token = signToken(newChild._id)
    
    // console.log(newChild);
    // console.log(updatedParent);
    
    res.status(201).json({
        status: 'success',
        token,
        data: {
            child: newChild,
            parent: updatedParent
        }
    })
    // console.log(newChild);
    // console.log(updatedParent);
    next();
})

exports.login = catchAsync (async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return next(new CustomAPIError('Please provide email and password', 400))
    };
    
    const parent = await Parent.findOne({ email }).select('+password');

    if(!parent || !(await parent.correctPassword(password, parent.password))) {
        return next(new CustomAPIError('Incorrect email or password'), 401);
    };
    
    const token = signToken(parent._id);
    // console.log(token);
    res.status(200).json({
        status: 'success',
        token
    })
})

exports.loginChild = catchAsync (async (req, res, next) => {
    const { userName, pin } = req.body;
    if(!userName || !pin) {
        return next(new CustomAPIError('Please provide username and PIN', 400))
    };
    
    const child = await Children.findOne({ userName }).select('+pin');
    
    if(!child || !(await child.correctPin(pin, child.pin))) {
        return next(new CustomAPIError('Incorrect userName or PIN'), 401);
    };
    
    const token = signToken(child._id);
    res.status(200).json({
        status: 'success',
        token
    })
    
})

exports.restrictToParents = catchAsync (async (req, res, next) =>{
    //get token and check for presence
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    
    if(!token){
        return next(new CustomAPIError('User not authorized, please login in to view page', 401));
    };
    
    //verify token - use promisify - built in nodejs - returns a promise
    const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    
    //check if user still exist - parent
    let currentUser = await Parent.findById(decodedToken.id);
    
    if(!currentUser){
        return next(new CustomAPIError('User not found'));
    }
    
    //grant access
    req.user = currentUser;
    next();
});

exports.restrictToChildren = catchAsync (async (req, res, next) =>{
    //get token and check for presence
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    
    if(!token){
        return next(new CustomAPIError('Please log in to view page', 401));
    };
    
    //verify token - use promisify - built in nodejs - returns a promise
    const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log('decodedToken:', decodedToken)
    
    //check if user still exist - child
    let currentUser = await Children.findById(decodedToken.id);
    console.log('currentUser',currentUser)
    // if(!currentUser){
    //     return next(new CustomAPIError('User not authorized'));
    // }
    
    //grant access
    req.user = currentUser;
    // console.log('current user:',req.user);
    next();
});