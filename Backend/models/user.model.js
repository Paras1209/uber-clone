const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true,  
        minlenght:[3,"username must be atleast 3 characters long"],
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlenght:[5 , "email must be atleast 5 characters long"],
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlenght:[5 , "password must be atleast 5 characters long"],
    },
    socketId:{
        type:String,
    },
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET);

    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;

