export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register'
    },
    RECIPES: {
        GET_RECIPE_STATS: '/api/recipes/stats',
        GET_RECIPE_RECENT: '/api/recipes/recent',
        GENERATE_RECIPE: '/api/recipes/generate',
        SAVE_RECIPE: '/api/recipes',
        GET_RECIPES: '/api/recipes',
        DELETE_RECIPE: (id) => `/api/recipes/${id}`,
        GET_RECIPE_DETAILS: (id) => `/api/recipes/${id}`
    },
    PANTRY: {
        GET_PANTRY: '/api/pantry',
        GET_PANTRY_STATS: '/api/pantry/stats',
        GET_PANTRY_EXPIRING_SOON: '/api/pantry/expiring-soon',
        GET_PANTRY_ADD: '/api/pantry',
        GET_PANTRY_DELETE: (id) => `/api/pantry/${id}`
    },
    MEAL_PLAN: {
        GET_MEAL_PLAN_STATS: '/api/meal-plans/stats',
        GET_MEAL_PLAN_UPCOMING: '/api/meal-plans/upcoming'
    },
    USER: {
        GET_USER_PREFERENCES: '/api/users/profile',
        
    }
}