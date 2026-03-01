import React, { useEffect, useState } from 'react'
import { startOfWeek } from 'date-fns';

import Navbar from '../components/layout/Navbar'
import WeekNavigation from '../components/layout/MealPlan/WeekNavigation';
import WeekDisplay from '../components/layout/MealPlan/WeekDisplay';
import CalendarGrid from '../components/layout/MealPlan/CalendarGrid';
import MealStats from '../components/layout/MealPlan/MealStats';

import { dummyMealPlans, dummyRecipes } from '../data/dummyData';

const MealPlannerPage = () => {

  const [weekStart, setWeekStart] = useState(startOfWeek(new Date()));
  const [mealPlan, setMealPlan] = useState({});
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const loadMealPlan = () => {
      // Organize dummy meals by date and meal type
      const organized = {};
      dummyMealPlans.forEach(meal => {
          const dateKey = meal.meal_date;
          if (!organized[dateKey]) {
              organized[dateKey] = {};
          }
          organized[dateKey][meal.meal_type] = meal;
      });
      setMealPlan(organized);
    };

    loadMealPlan();
    setRecipes(dummyRecipes);

  }, [weekStart]);

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
        
      </div>
    </div>
  )
}

export default MealPlannerPage