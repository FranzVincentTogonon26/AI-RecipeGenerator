import axiosInstance from "../libs/axiosInstance";
import { API_PATHS } from "../libs/apiPaths";
import { addDays, format } from "date-fns";

const mealPlanData = async (weekStart) => {
    try {
        const startDate = format(weekStart, 'yyyy-MM-dd');
        const endtDate = format(addDays(weekStart, 6), 'yyyy-MM-dd');
        const [ mealPlanRes, recipesRes ] = await Promise.all([
            axiosInstance.get(API_PATHS.MEAL_PLAN.GET_MEAL_PLAN_WEEKLY, { params: { startDate, endtDate } }),
            axiosInstance.get(API_PATHS.RECIPES.GET_RECIPES)
        ])

        return {
            mealPlans: mealPlanRes.data.data.mealPlans,
            recipes: recipesRes.data.data.recipes
        }

    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const addMeal = async ({ recipe_id, planned_date, meal_type }) => {
    try {
        const response = await axiosInstance.post(API_PATHS.MEAL_PLAN.ADD_MEAL_PLAN, {
            recipe_id: recipe_id,
            planned_date: planned_date,
            meal_type: meal_type
        });
        return response.data.data.mealPlan;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const deleteMealPlan = async (id) => {
    try {
        const response = await axiosInstance.delete(API_PATHS.MEAL_PLAN.DELETE_MEAL_PLAN(id) );
        return response.data.data.mealPlan;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const mealPlanService = {
    mealPlanData,
    addMeal,
    deleteMealPlan
}

export default mealPlanService;