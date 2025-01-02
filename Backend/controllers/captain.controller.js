const captainModel = require("../models/captain.model");
const captainservices = require("../services/captain.services");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res , next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

// console.log(req.body);
const { username , email, password , vehicle} = req.body;
const { color, plate, capacity, vehicleType } = vehicle;

const isCaptain = await captainModel.findOne({email});

if(isCaptain){
    return res.status(400).json({message:"captain already exists"});
}

const hashedPassword = await captainModel.hashPassword(password);

    // if (!name || !email || !password || !vehicle) {
    //     throw new Error("please provide all the fields");
    // }

    const captain = await captainservices.createCaptain({
        username,
        email,
        password: hashedPassword,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType,
        }
    })

    const token = captain.generateAuthToken();

    res.status(201).json({captain,token});
}

module.exports.loginCaptain = async (req, res , next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({email}).select("+password");

    if(!captain){
        return res.status(404).json({message:"captain not found"});
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(400).json({message:"invalid credentials"});
    }



    const token = captain.generateAuthToken();

    res.cookie("token",token);


    res.status(200).json({captain,token});
}

module.exports.getProfile = async (req, res , next) => {
    res.status(200).json({captain:req.captain});
}

module.exports.logoutCaptain = async (req, res , next) => {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    await blackListTokenModel.create({token});

    res.clearCookie("token");

    res.status(200).json({message:"captain logged out"});
}