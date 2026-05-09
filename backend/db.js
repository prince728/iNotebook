// db.js
const mongoose = require('mongoose');

const connectToMongo = async () => {
    try {
        // Ensure the variable exists before trying to connect
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI is undefined. Check your .env file location.");
        }

        await mongoose.connect(uri);
        console.log("Database is connected successfully");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1); // Stop the app if DB connection fails
    }
};

module.exports = connectToMongo;
