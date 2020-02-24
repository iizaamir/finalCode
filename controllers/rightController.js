const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const Right = require('./../models/rightsModel');

exports.getAllRights = catchAsync(async (req,res,next) => {
    const features = new APIFeatures(Right.find(), req.query).filter();
    const rights = await features.query;
    //const teams = await features.query.populate('otherUsers'); //use populate for child referencing.
    res.status(200).json({
        status: 'success',
        results: rights.length,
        data:{
            rights: rights
        }
    });
});

exports.getRight = catchAsync(async (req,res,next) => { //send only the data that is chaning.
    const rights = await Right.findById(req.params.id);
    // const team = await Team.findById(req.params.id).populate('otherUsers'); //use populate for child referencing.
    if(!rights){ //if error occured , pass it to next, when next receive something, it assumes error, jump to 
        //global error handling middleware
        return next(new AppError('No right found with that id',404)); //jump to the error handling middleware,
        //return immediatly and not move to next line, below code
    };
    res.status(200).json({ //204 when we delete an object
        status : 'success',
        data : {
            rights: rights
        }
    });
});

exports.createRight= catchAsync(async (req,res,next) => {
    const rights = await Right.create(req.body);
    res.status(201).json({
        status: 'success',
        data:{
            rights: rights
        }
    });
});