import dotenv from 'dotenv'
dotenv.config({ quiet: true });

export const ENV = {
    PORT:process.env.PORT,
    NODE_ENV:process.env.NODE_ENV,
    MONGO_DB_URI:process.env.MONGO_DB_URI,
    UPSTASH_REDIS_REST_URL:process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN:process.env.UPSTASH_REDIS_REST_TOKEN
}