const mongoose = require("mongoose");

let taskSchema = mongoose.Schema({
    userId : { type:String, required:true },
    taskInfo: [{
        title: { type: String, required: true },
        isComplete: { type: Boolean, default: false },
        date: { type: String, required: true },
        id: { type: String, required: true }
    }]
})

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;