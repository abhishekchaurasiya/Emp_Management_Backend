import mongoose from "mongoose";
const database_url = process.env.MONGODB_URL;

export const connectData = async () => {
    try {
        let database = await mongoose.connect(database_url.toString().trim())
        console.log(`Connected to MongoDB with ${database.connection.port}`)
    } catch (error) {
        console.error('Failed to connect to MongoDB', error)
        process.exit(1)
    }
}