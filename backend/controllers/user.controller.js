const { hashedPassword, generateAuthToken } = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

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

        res.status(200).json({ user, token })
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" })
    }
    
}