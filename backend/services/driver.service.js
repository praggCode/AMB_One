const driverModel = require('../models/driver.model');
const bcrypt = require('bcrypt');

module.exports.createDriver = async ({
    email, password, fullname, phoneNumber
}) => {
    if(!email || !password || !fullname || !phoneNumber) {
        throw new Error('All fields are required to create a driver');
    }
    const newDriver = driverModel.create({
        fullname: {
            firstName: fullname.firstName,
            lastName: fullname.lastName
        },
        email,
        password,
        phoneNumber
    })
    return newDriver;
}

module.exports.findDriverByEmail = async (email) => {
    return await driverModel.findOne({ email });
}

module.exports.comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}