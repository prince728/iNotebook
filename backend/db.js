const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = () => {
    try {
        mongoose.connect
            (mongoURI,console.log("Connected to MongoDB Successfully")
            );
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}

module.exports = connectToMongo;