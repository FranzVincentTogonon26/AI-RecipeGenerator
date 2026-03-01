import fs from 'fs'
import path from "path";
import { fileURLToPath } from "url";
import pkg from 'pg'
import { ENV } from "./src/config/env.js";

const { Pool } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
    connectionString: ENV.NEON_DB_URI,
    ssl: ENV.NEON_DB_URI ? { rejectUnauthorized: false } : false
});

async function runMigration() {
    const client = await pool.connect();

    try {
        console.log('Running database migration..');

        // Read the schema file
        const schemaPath = path.join(__dirname, 'src/config', 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        await client.query(schemaSql);

        console.log('Database migration completed successfully..');
        console.log('Tables created:');

    } catch (error) {
        console.log('Migration failed:', error.message );
        process.exit(1)
    } finally {
        client.release();
        await pool.end();
    }

}

runMigration();