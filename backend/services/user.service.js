const {findUserByEmailOrPhone, createUser: createUserModel, findUserByEmail, comparePassword,} = require("../models/user.model");

async function createUser({ name, email, password, phone }) {
  if (!name || !email || !password || !phone) {
    throw new Error("All fields are required to create a user.");
  }
  const existingUser = await findUserByEmailOrPhone({ email, phone });
  if (existingUser) {
    const err = new Error("User already exists");
    err.status = 400;
    throw err;
  }
  const user = await createUserModel({ name, email, password, phone });
  return user;
}

module.exports = {
  createUser,
  findUserByEmail,
  comparePassword,
};
