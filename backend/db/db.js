const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function connectToDb() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

connectToDb();
module.exports = {
  prisma,
  connectToDb,
};
