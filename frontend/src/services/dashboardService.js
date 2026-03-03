import axiosInstance from '../libs/axiosInstance'
import { API_PATHS } from '../libs/apiPaths'

const dashboardData = async () => {
    try {

        const [recipesRes, pantryRes, mealPlanRes, recentRecipeRes, upcomingMealPlanRes] = await Promise.all([
            axiosInstance.get(API_PATHS.RECIPES.GET_RECIPE_STATS),
            axiosInstance.get(API_PATHS.PANTRY.GET_PANTRY_STATS),
            axiosInstance.get(API_PATHS.MEAL_PLAN.GET_MEAL_PLAN_STATS),
            axiosInstance.get(API_PATHS.RECIPES.GET_RECIPE_RECENT),
            axiosInstance.get(API_PATHS.MEAL_PLAN.GET_MEAL_PLAN_UPCOMING)
        ]);
        
        return {
            statCard:{
                totalRecipes: recipesRes.data.data.stats.total_recipes || 0,
                pantryItems: pantryRes.data.data.stats.total_items || 0,
                mealsThisWeek: mealPlanRes.data.data.stats.total_planned_meals || 0
            },
            recentRecipe: recentRecipeRes.data.data.recipes || [],
            upcomingMeals: upcomingMealPlanRes.data.data.meals || []
        }

    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const dashboardService = {
    dashboardData
}

export default dashboardService;