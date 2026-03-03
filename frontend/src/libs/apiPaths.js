export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register'
    },
    RECIPES: {
        GET_RECIPE_STATS: '/api/recipes/stats',
        GET_RECIPE_RECENT: '/api/recipes/recent'
    },
    PANTRY: {
        GET_PANTRY_STATS: '/api/pantry/stats'
    },
    MEAL_PLAN: {
        GET_MEAL_PLAN_STATS: '/api/meal-plans/stats',
        GET_MEAL_PLAN_UPCOMING: '/api/meal-plans/upcoming'
    }
}