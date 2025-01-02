const captainModel = require("../models/captain.model");
const captainservices = require("../services/captain.services");
const { validationResult } = require("express-validator");

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
