const userModel = require('../models/user.model');
const driverModel = require('../models/driver.model');
const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
};

module.exports.authUser = async (req, res, next) => {
    const cookieToken = req.cookies.token;
    const headerToken = req.headers.authorization?.split(" ")[1];

    const checkToken = async (token) => {
        if (!token) return null;
        try {
            const decoded = verifyToken(token);
            if (!decoded || decoded.role !== 'user') return null;
            const user = await userModel.findUserByEmail(decoded.email);
            return user;
        } catch (err) {
            return null;
        }
    };
    let user = await checkToken(cookieToken);
    if (!user) {
        user = await checkToken(headerToken);
    }
    if (!user) {
        return res.status(401).json({ error: 'unauthorized' });
    }

    req.user = user;
    next();
}

module.exports.authDriver = async (req, res, next) => {
    const cookieToken = req.cookies.token;
    const headerToken = req.headers.authorization?.split(" ")[1];
    const checkToken = async (token) => {
        if (!token) return null;
        try {
            const decoded = verifyToken(token);
            if (!decoded || decoded.role !== 'driver') return null;
            const driver = await driverModel.findDriverByEmail(decoded.email);
            return driver;
        } catch (err) {
            return null;
        }
    };
    let driver = await checkToken(cookieToken);
    if (!driver) {
        driver = await checkToken(headerToken);
    }

    if (!driver) {
        return res.status(401).json({ error: 'unauthorized' });
    }

    req.driver = driver;
    next();
}
