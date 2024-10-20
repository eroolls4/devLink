const express = require("express")
const app = express();
const {adminAuth, userAuth} = require("./middlewares/auth")
const connectToDB = require("./config/database")
const User = require("./models/user")
const {validateEditProfileData, validateSignUpData} = require("./utils/validation")
const {request, response} = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const authRoute=require("./routes/auth")
const profileRoute=require("./routes/profile")
const requestRoute=require("./routes/request")
const userRoute=require("./routes/user")
const cors=require("cors")

const corsOptions= {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/",authRoute)
app.use("/",profileRoute)
app.use("/",requestRoute)
app.use("/",userRoute)

connectToDB().then(() => {
    console.log("connected to DB")
    app.listen(7000, () => {
        console.log("Application server is running successfully")
    })
})
