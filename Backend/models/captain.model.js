const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const captainSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlenght:[3,"username must be atleast 3 characters long"], 
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlenght:[5,"email must be atleast 5 characters long"],
        match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,"please enter a valid email address"],
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlenght:[5,"password must be atleast 5 characters long"],
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive",
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlenght:[3,"color must be atleast 3 characters long"],
        },
        plate:{
            type:String,
            required:true,
            minlenght:[3,"plate must be atleast 3 characters long"],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"capacity must be atleast 1"],
        },
        vehicleType:{
            type:String,
            required:true,
            enum:["car","motorcycle","auto"],
        },

    },
    location:{
        latitude:{
            type:Number,
        },
        longitude:{
            type:Number,
        },
    }

})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET, {expiresIn:"24h"});

    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model("captain",captainSchema);

module.exports = captainModel;