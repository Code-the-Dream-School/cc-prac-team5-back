const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Parent = require('../models/parentModel');
const Children = require('../models/childrenModel');
const catchAsync = require('../utils/catchAsync');
const CustomAPIError = require('../error-handlers/custom-api');
const { StatusCodes } = require('http-status-codes');


const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}

const createSendToken = (user, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    
    res.cookie('jwt', token, cookieOptions);
    
    user.password = undefined;
    user.pin = undefined;
    
    res.status(200).json({
        statusbar: 'success',
        token,
        data:{
            user
        }
    });
}

exports.register = catchAsync (async (req, res, next) => {
    const user = new Parent(req.body);
    await user.save();
    
    createSendToken(user, res);
    next();
    // const newParent = await Parent.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    });
    
    // const token = signToken(newParent._id)
    
    // res.status(201).json({
    //     status: 'success',
    //     token,
    //     data: {
    //         parent: newParent,
    //     }
    // })
//     next();
// });

exports.createChild = catchAsync( async (req, res, next) => {
  
    // const newChild = await Children.create({
    //     userName: req.body.userName,
    //     pin: req.body.pin,
    //     parent: req.body.id,
    // });
    const newChild = new Children(req.body);
    await newChild.save();
    
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
    // const token = signToken(newChild._id)
    createSendToken( newChild, res);
    // next();
    
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
    
    // const token = signToken(parent._id);
    // // console.log(token);
    // res.status(200).json({
    //     status: 'success',
    //     token
    // })
    createSendToken(parent, res);
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
    
    createSendToken(child, res);
    // const token = signToken(child._id);
    // res.status(200).json({
    //     status: 'success',
    //     token
    // })
    
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