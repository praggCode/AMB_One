const { findUserByEmailOrPhone, createUser } = require("../models/user.model");

module.exports.createUser = async ({ name, email, password, phone }) => {
  if (!name || !email || !password || !phone) {
    throw new Error("All fields are required to create a user.");
  }
  const existingUser = await findUserByEmailOrPhone({ email, phone });
  if (existingUser) {
    const err = new Error("User already exists");
    err.status = 400;
    throw err;
  }
  const user = await createUser({ name, email, password, phone });
  return user;
};
