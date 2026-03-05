import MealPlan from '../models/MealPlan.js'

// add recipe to meal plan
export const addToMealPlan = async (req, res, next) => {
    try {
        
        const mealPlan = await MealPlan.create(req.user.id, req.body);

        res.status(201).json({
            success: true,
            message: 'Recipe added to meal plan..',
            data: { mealPlan }
        })

    } catch (error) {
        next(error)
    }
}

// get weekly meal plan

export const getWeeklyMealPlan = async (req, res, next) => {
    try {
        const { startDate, endtDate} = req.query;
        const start_date = startDate || endtDate;

        if(!start_date){
            return res.status(400).json({
                success: false,
                message: 'Please provide start_date or weekStartDate..'
            })
        }

        const mealPlans = await MealPlan.getWeeklyPlan(req.user.id, startDate);

        res.json({
            success: true,
            data: { mealPlans }
        })

    } catch (error) {
        next(error)
    }
}

// get upcoming meals
export const getUpcomingMeals = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const meals = await MealPlan.getUpcoming(req.user.id, limit);

        res.json({
            success: true,
            data: { meals }
        });

    } catch (error) {
        next(error)
    }
}

// delete meals plan entry
export const deleteMealPlan = async (req, res, next) => {
    try {
        const { id } = req.params;
        const mealPlan = await MealPlan.delete(id, req.user.id);

        if(!mealPlan){
            return res.status(404).json({
                success: false,
                message: 'Meal plan entry not found..'
            })
        }

        res.json({
            success: false,
            message: 'Meal plan entry deleted..',
            data: { mealPlan }
        })

    } catch (error) {
        next(error)
    }
}

// get meal plan stats
export const getMealPlanStats = async (req, res, next) => {
    try {
        const stats = await MealPlan.getStats(req.user.id);

        res.json({
            success: true,
            data: { stats }
        })

    } catch (error) {
        next(error)
    }
}