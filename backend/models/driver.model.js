const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const driverSchema = new mongoose.Schema({
  fullname: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "FirstName must be at least 3 characters long"],
    },
    lastName: {
      type: String,
      minlength: [3, "LastName must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
});

driverSchema.statics.generateAuthToken = function (driver) {
  const token = jwt.sign({ email: driver.email, role: 'driver' }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

driverSchema.statics.hashPassword = async function (password) {
  const hashedPass = await bcrypt.hash(password, 10);
  return hashedPass;
};

driverSchema.statics.findDriverByEmail = async function (email) {
  return await this.findOne({ email });
}

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;

