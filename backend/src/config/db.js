import pkg from 'pg';
import { ENV } from './env.js';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: ENV.NEON_DB_URI,
  ssl: ENV.NEON_DB_URI ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
  console.log('Connected to Neon Postgres Database');
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

export default pool;