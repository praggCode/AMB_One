const User = require("../models/user.model");

async function createUser({ name, email, password, phone }) {
  if (!name || !email || !password || !phone) {
    throw new Error("All fields are required to create a user.");
  }
  const existingUser = await User.findUserByEmailOrPhone({ email, phone });
  if (existingUser) {
    const err = new Error("User already exists");
    err.status = 400;
    throw err;
  }
  const user = await User.create({ name, email, password, phone });
  return user;
}

async function findUserByEmail(email) {
  return await User.findUserByEmail(email);
}

async function comparePassword(password, hashedPassword) {
  return await User.comparePassword(password, hashedPassword);
}

async function findUserByEmailOrPhone({ email, phone }) {
  return await User.findUserByEmailOrPhone({ email, phone });
}

module.exports = {
  createUser,
  findUserByEmail,
  comparePassword,
  findUserByEmailOrPhone,
};
