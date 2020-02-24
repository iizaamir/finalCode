const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const Team = require('./../models/teamModel');

exports.getAllTeams = catchAsync(async (req,res,next) => {
    const features = new APIFeatures(Team.find(), req.query).filter();
    const teams = await features.query;
    //const teams = await features.query.populate('otherUsers'); //use populate for child referencing.
    res.status(200).json({
        status: 'success',
        results: teams.length,
        data:{
            teams: teams
        }
    });
});

exports.getTeam  = catchAsync(async (req,res,next) => { //send only the data that is chaning.
    const team = await Team.findById(req.params.id);
    // const team = await Team.findById(req.params.id).populate('otherUsers'); //use populate for child referencing.
    if(!team){ //if error occured , pass it to next, when next receive something, it assumes error, jump to 
        //global error handling middleware
        return next(new AppError('No user found with that id',404)); //jump to the error handling middleware,
        //return immediatly and not move to next line, below code
    };
    res.status(200).json({ //204 when we delete an object
        status : 'success',
        data : {
            team : team
        }
    });
});

exports.createTeam = catchAsync(async (req,res,next) => {
    const team = await Team.create(req.body);
    res.status(201).json({
        status: 'success',
        data:{
            team: team
        }
    });
});

exports.updateTeam= catchAsync(async (req,res,next) => { //send only the data that is chaning.
    const team = await Team.findByIdAndUpdate(req.params.id,req.body,{ //2nd is the data that we actually want 
        //to change is in post req
        new : true, //with this new updated document will be returned
        runValidators: true // again the data validators run each time
    }); 
    if(!team){ //if error occured , pass it to next, when next receive something, it assumes error, jump to 
        //global error handling middleware
        return next(new AppError('No user found with that id',404)); //jump to the error handling middleware,
        //return immediatly and not move to next line, below code
    };
    res.status(200).json({
        status : 'success',
        data : {
            team: team
        }
    });
});

exports.deleteTeam = catchAsync(async (req,res,next) => { //send only the data that is chaning.
    const team = await Team.findByIdAndDelete(req.params.id); //Don't save to vairable bcz don't want to send something to client
    if(!team){ //if error occured , pass it to next, when next receive something, it assumes error, jump to 
        //global error handling middleware
        return next(new AppError('No user found with that id',404)); //jump to the error handling middleware,
        //return immediatly and not move to next line, below code
    };
    res.status(204).json({ //204 when we delete an object
        status : 'success',
        data : null
    });
});