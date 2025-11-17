const driverModel = require('../models/driver.model');
const DriverService = require('../services/driver.service')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');

module.exports.registerDriver = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password, fullname, phoneNumber} = req.body

    const hashedPassword = await driverModel.hashPassword(password)
    const existingDriver = await DriverService.findDriverByEmail(email)
    if(existingDriver) {
        return  res.status(400).json({message: 'Driver with this email already exists'})
    }

    const driver = await DriverService.createDriver({
        email,
        password: hashedPassword,
        fullname,
        phoneNumber
    })

    const token = driverModel.generateAuthToken(driver)
    res.status(201).json({token, driver})
}

module.exports.loginDriver = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    } 
    const {email, password} = req.body
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