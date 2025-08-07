const admin = require("firebase-admin");
const serviceAccount = require("../firebase-adminsdk.json");

admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

// Express middleware function called verifyToken that checks if a user is authenticated by verifying a Firebase ID token sent in the request.
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded; // Store user data (e.g., uid, email)
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};

module.exports = verifyToken;