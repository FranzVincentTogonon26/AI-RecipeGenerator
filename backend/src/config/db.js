import pkg from 'pg';
import { ENV } from './env.js';

const { Pool } = pkg;

const connectDB = async () => {
    try {
        const pool = new Pool({
            connectionString: ENV.NEON_DB_URI,
            ssl: ENV.NEON_DB_URI ? { rejectUnauthorized: false } : false
        });

        // Test connection
        const client = await pool.connect();
        console.log(`Postgres Connected: ${client.database}`);
        client.release();

        // Handle unexpected errors
        pool.on('error', (error) => {
            console.log(`Unexpected database error: ${error}`);
            process.exit(1);
        });

        return pool;

    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;