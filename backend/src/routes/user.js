const express = require("express")
const {userAuth} = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const UserModel = require("../models/user")
const userRouter = express.Router()


userRouter.get(
    "/user/requests/received",
    userAuth,
    async (req, res) => {
        try {
            const loggedInUser = req.user;

            const getAllPendingRequests = await ConnectionRequestModel.find({
                toUserId: loggedInUser._id,
                status: "interested"
            }).populate("fromUserId", ["firstName", "lastName"]);

            res.json({
                message: "Data fetched successfully",
                data: getAllPendingRequests,
            })

        } catch (err) {
            res.status(400).json({
                idk: "There was an error processing the request",
                msg: err.message
            });
        }
    }
);

userRouter.get(
    "/user/connections",
    userAuth,
    async (req, res) => {
        try {
            const loggedInUser = req.user;

            const getAllUserConnections = await ConnectionRequestModel.find({
                $or: [
                    {toUserId: loggedInUser._id, status: "accepted"},
                    {fromUserId: loggedInUser._id, status: "accepted"}
                ]
            }).populate("fromUserId", ["firstName", "lastName"])
                .populate("fromUserId", ["firstName", "lastName"]);

            const data = getAllUserConnections.map((row) => {
                if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                    return row.toUserId;
                }
                return row.fromUserId;
            })

            res.json({
                message: "Data fetched successfully",
                data
            })

        } catch (err) {
            res.status(400).json({
                idk: "There was an error processing the request",
                msg: err.message
            });
        }
    }
);


//  /user/feed?page=1&limit=10 => query param

userRouter.get(
    "/user/feed",
    userAuth,
    async (req, res) => {
        try {
            const loggedInUser = req.user;

            const page = parseInt(req.query.page) || 1;
            let limit = parseInt(req.query.limit) || 10;
            limit = limit > 50 ? 50 : limit;

            const toSkip = (page - 1) * limit;


            //find all connectionReq( sent + received)
            const allConnections = await ConnectionRequestModel.find({
                $or: [
                    {fromUserId: loggedInUser._id},
                    {toUserId: loggedInUser._id}
                ]
            }).select("fromUserId toUserId")


            const hideUsersFromFeed = new Set();
            hideUsersFromFeed.add(loggedInUser._id.toString())

            allConnections.map((record) => {
                hideUsersFromFeed.add(record.fromUserId.toString())
                hideUsersFromFeed.add(record.toUserId.toString())
            })

            const properUsers = await UserModel.find(
                {
                    _id: {
                        $nin: Array.from(hideUsersFromFeed)
                    }
                }
            ).select("firstName lastName emailId")
             .skip(toSkip)
             .limit(limit)


            res.send(properUsers)

        } catch (err) {
            res.status(404).send(err.message)
        }
    }
)


module.exports = userRouter;