const { hashedPassword, generateAuthToken } = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const TokenBlacklist = require('../models/tokenBlacklist.model');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, email, password, phone } = req.body;
        const hashedPass = await hashedPassword(password);
        const user = await userService.createUser({ name, email, password: hashedPass, phone });
        const token = generateAuthToken(user);
        res.status(201).json({ user, token });
    } catch (err) {
        const status = err.status || 500;
        if (status === 400) {
            return res.status(400).json({ error: "User already exists" });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    } 
    const {email, password} = req.body
    try {
        const user = await userService.findUserByEmail(email)
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" })
        }
        const isMatch = await userService.comparePassword(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" })
        }

        const token = generateAuthToken(user)
        res.cookie('token', token)

        res.status(200).json({ user, token })
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" })
    }
    
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user)
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        // Decode the token to get its expiration time
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) {
            // If token is invalid or has no exp, just clear cookie and respond
            res.clearCookie('token');
            return res.status(200).json({ message: "Logged out successfully (token invalid/no exp)" });
        }

        const expiresAt = new Date(decoded.exp * 1000);
        const now = new Date();

        if (expiresAt > now) {
            const blacklistedToken = new TokenBlacklist({ token, expiresAt });
            await blacklistedToken.save();
        }

        res.clearCookie('token');
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ error: "Internal server error during logout" });
    }
};