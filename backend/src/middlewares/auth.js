const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    const cookies = req.cookies;
    console.log(cookies)
    const {token} = cookies;

    if (!token) {
        throw new Error("Invalid token")
    }

    const decodedMessage = await jwt.verify(token, "Test123@.");
    console.log(decodedMessage);

    const {_id} = decodedMessage;

    const user = await User.findById(_id);
    if (!user) {
        throw new Error("Invalid token")
    } 

    req.user = user;
    next();
}

const adminAuth = (req, res, next) => {
    const token = "abc";
    const isAdmin = token === "abc";
    if (isAdmin) {
        next();
    } else {
        res.status(401).send("you are not admin to make this operation");
    }
}
module.exports = {adminAuth, userAuth}
