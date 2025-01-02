const mongoose = require("mongoose");

function connectionToDb()
{
        mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("connected to databse");
        })
    
}

module.exports = connectionToDb;