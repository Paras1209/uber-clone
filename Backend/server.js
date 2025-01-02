const express = require("express");
const dotnev = require("dotenv");

dotnev.config();

const app = express();
const port = process.env.Port;

app.get('/' , (req, res) =>{
    res.send("hello ji");
})


app.listen(port , ()=>{
    console.log(`server is running on port ${port}`)
})


