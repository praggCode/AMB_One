const driverModel = require('../models/driver.model');
const DriverService = require('../services/driver.service')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');

module.exports.registerDriver = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password, fullname, phoneNumber } = req.body

    const hashedPassword = await driverModel.hashPassword(password)
    const existingDriver = await DriverService.findDriverByEmail(email)
    if (existingDriver) {
        return res.status(400).json({ error: "Driver already exists" })
    }

    const driver = await DriverService.createDriver({
        email,
        password: hashedPassword,
        fullname,
        phoneNumber
    })

    const token = driverModel.generateAuthToken(driver)
    res.cookie('token', token)
    res.status(201).json({ token, driver })
}

module.exports.loginDriver = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        const driver = await DriverService.findDriverByEmail(email)
        if (!driver) {
            return res.status(401).json({ error: "Invalid email or password" })
        }
        const isMatch = await DriverService.comparePassword(password, driver.password)
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" })
        }

        const token = driverModel.generateAuthToken(driver)
        res.cookie('token', token)

        res.status(200).json({ driver, token })
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports.getDriverProfile = async (req, res, next) => {
    res.status(200).json(req.driver)
}

module.exports.logoutDriver = async (req, res, next) => {
    res.clearCookie('token');
    return res.status(200).json({ message: "Logged out successfully" });
};

module.exports.toggleDriverStatus = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { status } = req.body;
        const driverId = req.driver._id;

        // Update driver status
        const updatedDriver = await driverModel.findByIdAndUpdate(
            driverId,
            { status },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedDriver) {
            return res.status(404).json({ error: "Driver not found" });
        }

        res.status(200).json({
            message: "Status updated successfully",
            driver: updatedDriver
        });
    } catch (err) {
        console.error("Error updating driver status:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};