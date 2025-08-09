const express = require("express");
const userModel = require("../Models/User");
const taskModel = require("../Models/Task")
const verifyToken = require("../Middlewares/verifyToken");

const router = express.Router();

router.post('/new', verifyToken, async (req, res) => {
    try {
        const { userId, taskInfo } = req.body;
        const existingUser = await taskModel.findOne({ userId: userId });

        let newTask;
        if(!existingUser){
        newTask = new taskModel({
            userId, taskInfo
        });
        await newTask.save();
        } else {
            await taskModel.updateOne(
                { userId: userId },
                { $push: { taskInfo: { $each: Array.isArray(taskInfo) ? taskInfo : [taskInfo] } } }
            );

            // Fetch updated document for response
            newTask = await taskModel.findOne({ userId: userId });
        }

        res.status(201).json({ message: "Tasks added successfully", data: newTask });
    } catch (error) {
        res.status(500).json({ error: error.message });   
    }
});

router.get('/list', verifyToken, async (req, res) => {
    try {
        const { uid } = req.user;
        const { date } = req.query;

        const userTasksDocument = await taskModel.findOne({ userId: uid });
        if (!userTasksDocument) {
            return res.status(200).json({ data: [] });
        }

        let tasksToReturn = userTasksDocument.taskInfo;
        if (date) {
            tasksToReturn = userTasksDocument.taskInfo.filter(task => 
                task.date.startsWith(date)
            );
        }
        
        res.json({ data: tasksToReturn });
    } catch (error) {
        res.status(500).json({ error: error.message });   
    }
});

module.exports = router;