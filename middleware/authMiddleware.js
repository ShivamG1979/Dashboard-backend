
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];  // Extract only the token

    if (!token) {
        return res.status(401).json({ msg: "No token found. Please log in." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded user ID:", decoded.userId);  // Debugging

        req.user = { id: decoded.userId };  // ✅ Ensure req.user.id is set correctly
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = authMiddleware;
