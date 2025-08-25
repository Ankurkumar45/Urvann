const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './.env' });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB connected successfully')
        return conn;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`)
        process.exit(1)
    }
}

module.exports = { connectDB }