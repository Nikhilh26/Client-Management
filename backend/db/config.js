const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to DB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

module.exports = connectDB;