import express from 'express'
import cors from 'cors'

import { ENV } from './config/env.js'
import rateLimiter from './middleware/rateLimiter.js'

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import pantryRoutes from './routes/pantry.js'
import recipeRoutes from './routes/recipes.js'
import mealPlanRoutes from './routes/mealPlans.js'
import shoppingRoutes from './routes/shoppingList.js'

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

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/meal-plans', mealPlanRoutes);
app.use('/api/shopping-list', shoppingRoutes);

app.listen( ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`)
} )