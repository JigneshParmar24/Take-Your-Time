const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    firebaseUid: {type:String, required:true, unique:true},
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true}
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;