const mongoose = require("mongoose");

const connectToDB = async () => {
    await mongoose.connect("mongodb+srv://test:test12345@devtinderdb.zdj1a.mongodb.net/")
}

module.exports = connectToDB;