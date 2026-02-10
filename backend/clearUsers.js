// Script to clear all users from the database
// Run this with: node backend/clearUsers.js

require('dotenv').config();
const mongoose = require('mongoose');

const clearUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        // Get the users collection
        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');
        const driversCollection = db.collection('drivers');

        // Delete all users
        const userResult = await usersCollection.deleteMany({});
        console.log(`Deleted ${userResult.deletedCount} users`);

        // Delete all drivers
        const driverResult = await driversCollection.deleteMany({});
        console.log(`Deleted ${driverResult.deletedCount} drivers`);

        console.log('✅ Database cleared successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error clearing database:', error);
        process.exit(1);
    }
};

clearUsers();
