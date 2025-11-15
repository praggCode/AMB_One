const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/tokenBlacklist.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization?.split(" ")[1]);

    if (!token) {
        return res.status(401).json({ error: 'unauthorized' });
    }

    try {
        // Check if the token is blacklisted
        const blacklistedToken = await TokenBlacklist.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ error: 'unauthorized - token blacklisted' });
        }

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
