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
    credentials:true
}

app.use(cors(corsOptions))
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

app.use("/admin", adminAuth)
// app.use("/user", userAuth)


// app.post("/signup", async (req, res) => {
//     try {
//         const {emailId, firstName, lastName, password} = req.body;
//         validateSignUpData(req)
//
//         const hashedPassword = await bcrypt.hash(password, 10);
//
//         const newUserObj = new User({
//             firstName: firstName,
//             lastName: lastName,
//             emailId: emailId,
//             password: hashedPassword,
//         })
//         await newUserObj.save()
//         res.send("added user to DB")
//     } catch (err) {
//         res.status(400).send(err.message)
//     }
// })
//
// app.post("/login", async (req, res) => {
//     try {
//         const {emailId, password} = req.body;
//         const user = await User.findOne({emailId: emailId}).exec();
//
//         if (!user) {
//             return res.status(404)
//                 .send("Invalid credentials")
//         }
//
//         const match = await user.validatePassword(password);
//
//         if (!match) {
//             return res.status(404).send("Invalid credentials")
//         } else {
//             const token = await user.generateJWT();
//             res.cookie("token", token)
//             return res.status(200).send("Successfully logged in")
//         }
//     } catch (err) {
//         return res.status(500).send(err.message);
//     }
// })

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        return res.send(user)
    } catch (err) {
        return res.status(501).send(err.message)

    }
})

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findOneAndDelete({_id: userId});
    } catch (err) {
        res.status(400).send("Something went wrong ");
    }
})


// Update data of the user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try {
        validateEditProfileData(req)
        const user = await User.findByIdAndUpdate({_id: userId}, data, {
            returnDocument: "after",
            runValidators: true,
        });
        console.log(user);
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("Something went wrong ");
    }
});


app.get("/admin/getData", (req, res, next) => {
    console.log("SENDING THE DATA NOW")
    res.send("DATA IS SENT SUCCESSFULLY........")
})


app.post("/admin/user", (req, res, next) => {
    console.log("MAKING A POST REQUEST")
    res.send("SUCCESSFULLY SAVED  RECORD TO DB .....")
})


app.get("/user/:userId", (req, res, next) => {
    console.log("--- Hello from first controller of user ---")
    next();
}, (req, res) => {
    console.log("--- HELLO FROM SECOND CONTROLLER OF USER ---")
    res.send({firstName: "TEST", lastName: "12345"})
})