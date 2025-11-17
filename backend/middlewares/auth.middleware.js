const userModel = require('../models/user.model');
const driverModel = require('../models/driver.model');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization?.split(" ")[1]);

    if (!token) {
        return res.status(401).json({ error: 'unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findUserByEmail(decoded.email)
        if (!user) {
            return res.status(401).json({ error: 'unauthorized' });
        }
        req.user = user
        next();
    }
    catch (err){
        return res.status(401).json({ error: 'unauthorized' });
    }

}

module.exports.authDriver = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization?.split(" ")[1]);

    if (!token) {
        return res.status(401).json({ error: 'unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const driver = await driverModel.findDriverByEmail(decoded.email)
        if (!driver) {
            return res.status(401).json({ error: 'unauthorized' });
        }
        req.driver = driver
        next();
    }
    catch (err){
        return res.status(401).json({ error: 'unauthorized' });
    }

}
