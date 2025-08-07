const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mong_url = process.env.MONGO_CON;

let db = mongoose.connect(mong_url)
                    .then(() => {
                        console.log("MongoDB connected...");
                        return mongoose.connection;
                    }).catch((err) => {
                        console.error("MongoDB connection error : ", err);
                        throw err;
                    })

module.exports = db;