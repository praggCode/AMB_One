const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
  phone: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.statics.generateAuthToken = function (user) {
  const token = jwt.sign({ email: user.email, role: 'user' }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.statics.hashedPassword = async function (password) {
  const hashedPass = await bcrypt.hash(password, 10);
  return hashedPass;
};

userSchema.statics.comparePassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

userSchema.statics.findUserByEmail = async function (email) {
  return await this.findOne({ email });
};

userSchema.statics.findUserByEmailOrPhone = async function ({ email, phone }) {
  return await this.findOne({
    $or: [{ email }, { phone }],
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
