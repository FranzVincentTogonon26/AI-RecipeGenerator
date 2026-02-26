import express from 'express'
import cors from 'cors'

import { ENV } from './libs/env.js'
import connectDB from './libs/db.js'
import rateLimiter from './middleware/rateLimiter.js'

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(rateLimiter)

connectDB().then( () => {
    app.listen( ENV.PORT, () => {
        console.log(`Server running on port ${ENV.PORT}`)
    } )
})