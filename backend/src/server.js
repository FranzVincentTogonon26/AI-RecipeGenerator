import express from 'express'
import cors from 'cors'

import { ENV } from './config/env.js'
import rateLimiter from './middleware/rateLimiter.js'

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

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
// app.use(rateLimiter)

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen( ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`)
} )