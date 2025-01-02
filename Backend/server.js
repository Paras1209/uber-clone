const dotnev = require("dotenv");
dotnev.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./db/db");
const userRoute = require("./routes/user.route");


connectDb();
const app = express();
const port = process.env.Port;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors());
app.use('/user' , userRoute);


app.listen(port , ()=>{
    console.log(`server is running on port ${port}`)
})


