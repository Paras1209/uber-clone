const userModel = require("../models/user.model");

module.exports.createUser = async (username , email , password) => {
    if(!username || !email || !password){
        throw new Error("please provide all the fields");
    }

    const user = userModel.create({
        username,
        email,
        password,
    })
   
    return user;
}