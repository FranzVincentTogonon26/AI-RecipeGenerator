import dotenv from 'dotenv'
dotenv.config({ quiet: true });

export const ENV = {
    PORT:process.env.PORT,
    NODE_ENV:process.env.NODE_ENV,
    NEON_DB_URI:process.env.NEON_DB_URI,
    UPSTASH_REDIS_REST_URL:process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN:process.env.UPSTASH_REDIS_REST_TOKEN,
    JWT_SECRET:process.env.JWT_SECRET,
    GEMINI_API_KEY:process.env.GEMINI_API_KEY
}