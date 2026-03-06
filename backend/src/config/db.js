import pkg from 'pg';
import { ENV } from './env.js';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: ENV.NEON_DB_URI,
  ssl: ENV.NEON_DB_URI ? { rejectUnauthorized: false } : false,
});

pool.on('connect', () => {
  console.log('PostgreSQL connected');
});

pool.on('error', (err) => {
  console.error('Unexpected DB error:', err);
  process.exit(1);
});

export const query = (text, params) => pool.query(text, params);

export const connectDB = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Database connection verified');
  } catch (error) {
    console.error('Failed to connect to database');
    console.error(error);
    process.exit(1);
  }
};

export default pool;