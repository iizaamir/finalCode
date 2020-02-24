const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const User = require('./../models/userModel');

exports.getAllUsers = catchAsync(async (req,res,next) => {
    const features = new APIFeatures(User.find(), req.query).filter();
    const user = await features.query;
    res.status(200).json({
        status: 'success',
        results: user.length,
        data:{
            user: user
        }
    });
});

exports.getUser  = catchAsync(async (req,res,next) => { //send only the data that is chaning.
    const user = await User.findById(req.params.id);
    if(!user){ //if error occured , pass it to next, when next receive something, it assumes error, jump to 
        //global error handling middleware
        return next(new AppError('No user found with that id',404)); //jump to the error handling middleware,
        //return immediatly and not move to next line, below code
    };
    res.status(200).json({ //204 when we delete an object
        status : 'success',
        data : {
            user: user
        }
    });
});

exports.createUser = catchAsync(async (req,res,next) => {
    const users = await User.create(req.body);
    res.status(201).json({
        status: 'success',
        data:{
            users: users
        }
    });
});

exports.updateUser= catchAsync(async (req,res,next) => { //send only the data that is chaning.
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{ //2nd is the data that we actually want 
        //to change is in post req
        new : true, //with this new updated document will be returned
        runValidators: true // again the data validators run each time
    }); 
    if(!user){ //if error occured , pass it to next, when next receive something, it assumes error, jump to 
        //global error handling middleware
        return next(new AppError('No user found with that id',404)); //jump to the error handling middleware,
        //return immediatly and not move to next line, below code
    };
    res.status(200).json({
        status : 'success',
        data : {
            user: user
        }
    });
});

exports.deleteUser = catchAsync(async (req,res,next) => { //send only the data that is chaning.
    const user = await User.findByIdAndDelete(req.params.id); //Don't save to vairable bcz don't want to send something to client
    if(!user){ //if error occured , pass it to next, when next receive something, it assumes error, jump to 
        //global error handling middleware
        return next(new AppError('No user found with that id',404)); //jump to the error handling middleware,
        //return immediatly and not move to next line, below code
    };
    res.status(204).json({ //204 when we delete an object
        status : 'success',
        data : null
    });
});