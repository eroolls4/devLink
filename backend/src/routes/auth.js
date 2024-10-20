const express = require("express");
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post(
    "/signup",
    async (req, res, next) => {
        try {
            const {emailId, firstName, lastName, password} = req.body;
            validateSignUpData(req)

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUserObj = new User({
                firstName: firstName,
                lastName: lastName,
                emailId: emailId,
                password: hashedPassword,
            })

           const user= await newUserObj.save()
            res.json({message : "added user to DB" ,
                 user
            })
        } catch (err) {
            res.status(400).send(err.message)
        }
})

authRouter.post(
    "/login",
    async (req, res, next) => {
        try {
            const {emailId, password} = req.body;
            const user = await User.findOne({emailId: emailId}).exec();

            if (!user) {
                return res.status(404)
                    .send("Invalid credentials")
            }

            const match = await user.validatePassword(password);

            if (!match) {
                return res.status(404).send("Invalid credentials")
            } else {
                const token = await user.generateJWT();
                res.cookie("token", token)
                return res.status(200).send(user)
            }
        } catch (err) {
            return res.status(500).send(err.message);
        }
})

authRouter.post(
    "/logout",
    async (req, res, next) => {
        try {
            res.cookie("token", null, {expires: new Date(Date.now())})
            res.send("Logged out successfully")
        } catch (err) {
            res.status(501).send("there was errror processing the request")
        }
})


module.exports = authRouter;