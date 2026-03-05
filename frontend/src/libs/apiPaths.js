export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register'
    },
    RECIPES: {
        RECIPE_STATS: '/api/recipes/stats',
        RECIPE_RECENT: '/api/recipes/recent',
        RECIPE_GENERATE: '/api/recipes/generate',
        RECIPE_ADD: '/api/recipes',
        RECIPES: '/api/recipes',
        RECIPE_DELETE: (id) => `/api/recipes/${id}`,
        RECIPE_DETAILS: (id) => `/api/recipes/${id}`
    },
    PANTRY: {
        PANTRIES: '/api/pantry',
        PANTRY_STATS: '/api/pantry/stats',
        PANTRY_EXPIRING_SOON: '/api/pantry/expiring-soon',
        PANTRY_ADD: '/api/pantry',
        PANTRY_DELETE: (id) => `/api/pantry/${id}`
    },
    MEAL_PLAN: {
        MEAL_PLAN_STATS: '/api/meal-plans/stats',
        MEAL_PLAN_UPCOMING: '/api/meal-plans/upcoming',
        MEAL_PLAN_WEEKLY: '/api/meal-plans/weekly',
        MEAL_PLANS: '/api/meal-plans',
        MEAL_PLAN_DELETE: (id) => `/api/meal-plans/${id}`
    },
    USER: {
        USER_PREFERENCES: '/api/users/profile',
        
    },
    SHOPPING_LIST: {
        SHOPPING_LIST: '/api/shopping-list',
        SHOPPING_LIST_ADD: '/api/shopping-list',
        DELETE_ALL_CHECKED: '/api/shopping-list/clear/checked',
        ITEMS_ADD_TO_PANTRY: '/api/shopping-list/add-to-pantry',
        SHOPPING_LIST_DELETE: (id) => `/api/shopping-list/${id}`,
        TOGGLE_ITEM: (id) => `/api/shopping-list/${id}/toggle`
    }
}