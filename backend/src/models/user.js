const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 50,
        },

        lastName: {
            type: String,
        },

        emailId: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        age: {
            type: Number,
            min: 18,
        },

        gender: {
            type: String,
            enum: {
                values: ["male", "female"],
                message: `{VALUE} is incorrect status type`,
            },
            // validate(value) {
            //     if (!["male", "female"].includes(value)) {
            //         throw new Error("Gender data is not valid");
            //     }
            // },
        },

        photoUrl: {
            type: String,
            default: "https://geographyandyou.com/images/user-profile.png",
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error("Invalid Photo URL: " + value);
                }
            },
        },

        about: {
            type: String,
            default: "This is a default about of the user!",
        },

        skills: {
            type: [String],
        }
    },
    {
        timestamps: true
    }
)

userSchema.methods.generateJWT = async function () {
    const user = this;
    return await jwt.sign({_id: user._id}, "Test123@.", {expiresIn: "7d"})
}

userSchema.methods.validatePassword = async function (userInputPassword) {
    const user = this;
    const passwordHash = user.password;

    return await bcrypt.compare(
        userInputPassword,
        passwordHash
    );
}


const User = mongoose.model("User", userSchema);
module.exports = User;