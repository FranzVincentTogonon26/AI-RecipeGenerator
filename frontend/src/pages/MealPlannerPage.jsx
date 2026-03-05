import React, { useEffect, useState } from 'react'
import { startOfWeek } from 'date-fns';

import Navbar from '../components/layout/Navbar'
import WeekNavigation from '../components/layout/MealPlan/WeekNavigation';
import WeekDisplay from '../components/layout/MealPlan/WeekDisplay';
import CalendarGrid from '../components/layout/MealPlan/CalendarGrid';
import MealStats from '../components/layout/MealPlan/MealStats';
import Spinner from '../components/layout/Spinner'
import toast from 'react-hot-toast';

import mealPlanService from '../services/mealPlanService';

const MealPlannerPage = () => {

  const [weekStart, setWeekStart] = useState(startOfWeek(new Date()));
  const [mealPlan, setMealPlan] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] =useState(false);

  useEffect(() => {
    const fetchMealPlanData = async () => {
      try {
        setLoading(true);
        const response = await mealPlanService.mealPlanData(weekStart);
        const organized = {};
          response.mealPlans.forEach(meal => {
          const dateKey = meal.meal_date;
            if (!organized[dateKey]) {
                organized[dateKey] = {};
            }
            organized[dateKey][meal.meal_type] = meal;
          });
        setMealPlan(organized);
        setRecipes(response.recipes);
        
      } catch (error) {
        toast.error('Failed to load meal plan data.', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMealPlanData();

  }, [weekStart]);

  const renderContent = () => {
    if(loading){
      return (
        <Spinner />
      )
    }
    return (
      <>
        {/* Week Display */}
        <WeekDisplay weekStart={weekStart} />
        
        {/* Calendar Grid */}
        <CalendarGrid 
            weekStart={weekStart}
            mealPlan={mealPlan}
            setMealPlan={setMealPlan}
            recipes={recipes}
        />
        
        {/* Stats */}
        <MealStats recipes={recipes} mealPlan={mealPlan} weekStart={weekStart} />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
              <h1 className="text-3xl font-bold text-gray-900">Meal Planner</h1>
              <p className="text-gray-600 mt-1">Plan your weekly meals</p>
          </div>
          {/* Week Navigation */}
          <WeekNavigation weekStart={weekStart} setWeekStart={setWeekStart} />
          
        </div>
        {renderContent()}
      </div>
    </div>
  )
}

export default MealPlannerPage