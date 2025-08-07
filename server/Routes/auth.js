const express = require("express");
const userModel = require("../Models/User");
const verifyToken = require("../Middlewares/verifyToken");

const router = express.Router();
router.use(express.json());

// Create a new user in MongoDB after they sign up with Firebase Authentication
router.post('/signup', verifyToken, async (req, res) => {
    try {
        const { name } = req.body;
        const { uid, email } = req.user;
        console.log("Signup - User:", { uid, email, name }); // Debug
        const existingUser = await userModel.findOne({ firebaseUid: uid });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const user = new userModel({ firebaseUid: uid, name, email });
        await user.save();
        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.get('/user', verifyToken, async(req, res)=>{
    try {
        const { uid } = req.user;
        const existingUser = await userModel.findOne({firebaseUid : uid});
        res.json(existingUser?.name || "");
    } catch (error) {
        console.error("GET /user error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

module.exports = router;