import mongoose from 'mongoose';
import { ENV  } from './env.js';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_DB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.log(`Error: ${error.message}`,);
        process.exit(1);
    }
}

export default connectDB;