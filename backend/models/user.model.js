const { prisma } = require("../db/db");

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

async function hashedPassword(password) {
  const hashedPass = await bcrypt.hash(password, 10);
    return hashedPass;
}

async function comparePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

function generateAuthToken(user) {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  return token;
}

async function findUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

async function findUserByEmailOrPhone({ email, phone }) {
  return await prisma.user.findFirst({
    where: {
      OR: [
        email ? { email } : undefined,
        phone ? { phone } : undefined,
      ].filter(Boolean),
    },
  });
}

async function createUser({ name, email, password, phone }) {
  return await prisma.user.create({
    data: {
      name,
      email,
      password,
      phone,
    },
  });
}

module.exports = {
  hashedPassword,
  comparePassword,
  generateAuthToken,
  findUserByEmail,
  findUserByEmailOrPhone,
  createUser,
};