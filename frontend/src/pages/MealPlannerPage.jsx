import React, { useEffect, useState } from 'react'
import { addDays, format, startOfWeek } from 'date-fns';
import { Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

import Navbar from '../components/layout/Navbar'
import AddMealModal from '../components/layout/MealPlan/AddMealModal';

const dummyMealPlans = [
    {
        id: 1,
        user_id: 1,
        recipe_id: 1,
        meal_date: '2026-02-20',
        meal_type: 'dinner',
        recipe_name: 'Creamy Tomato Basil Pasta',
        image_url: null,
        prep_time: 10,
        cook_time: 20,
        created_at: '2024-02-10T14:00:00Z'
    },
    {
        id: 2,
        user_id: 1,
        recipe_id: 3,
        meal_date: '2026-02-21',
        meal_type: 'lunch',
        recipe_name: 'Mediterranean Quinoa Bowl',
        image_url: null,
        prep_time: 10,
        cook_time: 20,
        created_at: '2024-02-10T14:05:00Z'
    },
    {
        id: 3,
        user_id: 1,
        recipe_id: 2,
        meal_date: '2026-02-22',
        meal_type: 'dinner',
        recipe_name: 'Spicy Thai Vegetable Stir-Fry',
        image_url: null,
        prep_time: 15,
        cook_time: 15,
        created_at: '2024-02-10T14:10:00Z'
    },
    {
        id: 4,
        user_id: 1,
        recipe_id: 5,
        meal_date: '2026-02-23',
        meal_type: 'dinner',
        recipe_name: 'Chickpea Curry',
        image_url: null,
        prep_time: 10,
        cook_time: 25,
        created_at: '2024-02-10T14:15:00Z'
    },
    {
        id: 5,
        user_id: 1,
        recipe_id: 4,
        meal_date: '2024-02-15',
        meal_type: 'dinner',
        recipe_name: 'Classic Margherita Pizza',
        image_url: null,
        prep_time: 90,
        cook_time: 15,
        created_at: '2024-02-10T14:20:00Z'
    },
    {
        id: 6,
        user_id: 1,
        recipe_id: 1,
        meal_date: '2024-02-16',
        meal_type: 'lunch',
        recipe_name: 'Creamy Tomato Basil Pasta',
        image_url: null,
        prep_time: 10,
        cook_time: 20,
        created_at: '2024-02-10T14:25:00Z'
    }
];

const dummyRecipes = [
    {
        id: 1,
        user_id: 1,
        name: 'Creamy Tomato Basil Pasta',
        description: 'A delicious and creamy pasta dish with fresh tomatoes and basil',
        cuisine_type: 'Italian',
        difficulty: 'easy',
        prep_time: 10,
        cook_time: 20,
        servings: 4,
        instructions: [
            'Bring a large pot of salted water to boil and cook pasta according to package directions',
            'While pasta cooks, heat olive oil in a large skillet over medium heat',
            'Add minced garlic and cook until fragrant, about 1 minute',
            'Add diced tomatoes and cook for 5-7 minutes until they start to break down',
            'Stir in heavy cream and bring to a simmer',
            'Add fresh basil, salt, and pepper to taste',
            'Drain pasta and toss with the sauce',
            'Serve hot with grated Parmesan cheese'
        ],
        dietary_tags: ['Vegetarian'],
        user_notes: null,
        image_url: null,
        created_at: '2024-02-01T14:20:00Z',
        calories: 450,
        ingredients: [
            { name: 'Pasta', quantity: 400, unit: 'g' },
            { name: 'Tomatoes', quantity: 4, unit: 'pieces' },
            { name: 'Garlic', quantity: 3, unit: 'cloves' },
            { name: 'Heavy Cream', quantity: 200, unit: 'ml' },
            { name: 'Fresh Basil', quantity: 1, unit: 'cup' },
            { name: 'Olive Oil', quantity: 2, unit: 'tbsp' },
            { name: 'Parmesan Cheese', quantity: 50, unit: 'g' }
        ],
        nutrition: {
            calories: 450,
            protein: 15,
            carbs: 55,
            fats: 18,
            fiber: 4
        }
    },
    {
        id: 2,
        user_id: 1,
        name: 'Spicy Thai Vegetable Stir-Fry',
        description: 'A vibrant and spicy stir-fry packed with colorful vegetables',
        cuisine_type: 'Thai',
        difficulty: 'medium',
        prep_time: 15,
        cook_time: 15,
        servings: 4,
        instructions: [
            'Prepare all vegetables by cutting them into bite-sized pieces',
            'Heat vegetable oil in a wok or large skillet over high heat',
            'Add garlic and ginger, stir-fry for 30 seconds',
            'Add bell peppers and broccoli, stir-fry for 3-4 minutes',
            'Add remaining vegetables and stir-fry for another 3 minutes',
            'Mix soy sauce, lime juice, and chili paste in a small bowl',
            'Pour sauce over vegetables and toss to coat',
            'Garnish with fresh cilantro and serve over rice'
        ],
        dietary_tags: ['Vegan', 'Gluten-Free'],
        user_notes: 'Adjust chili paste to taste',
        image_url: null,
        created_at: '2024-02-03T09:15:00Z',
        calories: 220,
        ingredients: [
            { name: 'Bell Peppers', quantity: 2, unit: 'pieces' },
            { name: 'Broccoli', quantity: 200, unit: 'g' },
            { name: 'Carrots', quantity: 2, unit: 'pieces' },
            { name: 'Snap Peas', quantity: 150, unit: 'g' },
            { name: 'Garlic', quantity: 4, unit: 'cloves' },
            { name: 'Ginger', quantity: 2, unit: 'tbsp' },
            { name: 'Soy Sauce', quantity: 3, unit: 'tbsp' },
            { name: 'Lime Juice', quantity: 2, unit: 'tbsp' },
            { name: 'Chili Paste', quantity: 1, unit: 'tbsp' }
        ],
        nutrition: {
            calories: 220,
            protein: 8,
            carbs: 35,
            fats: 6,
            fiber: 8
        }
    },
    {
        id: 3,
        user_id: 1,
        name: 'Mediterranean Quinoa Bowl',
        description: 'A healthy and filling quinoa bowl with Mediterranean flavors',
        cuisine_type: 'Mediterranean',
        difficulty: 'easy',
        prep_time: 10,
        cook_time: 20,
        servings: 2,
        instructions: [
            'Rinse quinoa and cook according to package directions',
            'While quinoa cooks, dice cucumber, tomatoes, and red onion',
            'Crumble feta cheese',
            'Make dressing by whisking olive oil, lemon juice, and oregano',
            'Fluff cooked quinoa with a fork and let cool slightly',
            'Combine quinoa with vegetables in a large bowl',
            'Drizzle with dressing and toss to combine',
            'Top with feta cheese and olives',
            'Serve warm or chilled'
        ],
        dietary_tags: ['Vegetarian', 'Gluten-Free'],
        user_notes: null,
        image_url: null,
        created_at: '2024-02-05T11:30:00Z',
        calories: 380,
        ingredients: [
            { name: 'Quinoa', quantity: 200, unit: 'g' },
            { name: 'Cucumber', quantity: 1, unit: 'pieces' },
            { name: 'Cherry Tomatoes', quantity: 200, unit: 'g' },
            { name: 'Red Onion', quantity: 0.5, unit: 'pieces' },
            { name: 'Feta Cheese', quantity: 100, unit: 'g' },
            { name: 'Kalamata Olives', quantity: 50, unit: 'g' },
            { name: 'Olive Oil', quantity: 3, unit: 'tbsp' },
            { name: 'Lemon Juice', quantity: 2, unit: 'tbsp' },
            { name: 'Dried Oregano', quantity: 1, unit: 'tsp' }
        ],
        nutrition: {
            calories: 380,
            protein: 14,
            carbs: 42,
            fats: 18,
            fiber: 6
        }
    },
    {
        id: 4,
        user_id: 1,
        name: 'Classic Margherita Pizza',
        description: 'Traditional Italian pizza with fresh mozzarella and basil',
        cuisine_type: 'Italian',
        difficulty: 'medium',
        prep_time: 90,
        cook_time: 15,
        servings: 4,
        instructions: [
            'Prepare pizza dough and let it rise for 1 hour',
            'Preheat oven to 475°F (245°C)',
            'Roll out dough into a 12-inch circle',
            'Spread tomato sauce evenly over dough',
            'Tear fresh mozzarella and distribute over sauce',
            'Drizzle with olive oil and season with salt',
            'Bake for 12-15 minutes until crust is golden',
            'Remove from oven and top with fresh basil leaves',
            'Slice and serve immediately'
        ],
        dietary_tags: ['Vegetarian'],
        user_notes: 'Use a pizza stone for best results',
        image_url: null,
        created_at: '2024-02-07T16:45:00Z',
        calories: 520,
        ingredients: [
            { name: 'Pizza Dough', quantity: 500, unit: 'g' },
            { name: 'Tomato Sauce', quantity: 200, unit: 'ml' },
            { name: 'Fresh Mozzarella', quantity: 250, unit: 'g' },
            { name: 'Fresh Basil', quantity: 1, unit: 'cup' },
            { name: 'Olive Oil', quantity: 2, unit: 'tbsp' },
            { name: 'Salt', quantity: 1, unit: 'tsp' }
        ],
        nutrition: {
            calories: 520,
            protein: 22,
            carbs: 65,
            fats: 18,
            fiber: 3
        }
    },
    {
        id: 5,
        user_id: 1,
        name: 'Chickpea Curry',
        description: 'A warming and aromatic Indian-style chickpea curry',
        cuisine_type: 'Indian',
        difficulty: 'easy',
        prep_time: 10,
        cook_time: 25,
        servings: 4,
        instructions: [
            'Heat oil in a large pot over medium heat',
            'Add onions and cook until softened, about 5 minutes',
            'Add garlic, ginger, and spices, cook for 1 minute',
            'Add diced tomatoes and cook for 5 minutes',
            'Add chickpeas and coconut milk',
            'Bring to a simmer and cook for 15 minutes',
            'Season with salt and pepper to taste',
            'Garnish with fresh cilantro',
            'Serve over rice or with naan bread'
        ],
        dietary_tags: ['Vegan', 'Gluten-Free'],
        user_notes: null,
        image_url: null,
        created_at: '2024-02-09T13:20:00Z',
        calories: 340,
        ingredients: [
            { name: 'Chickpeas', quantity: 400, unit: 'g' },
            { name: 'Coconut Milk', quantity: 400, unit: 'ml' },
            { name: 'Onion', quantity: 1, unit: 'pieces' },
            { name: 'Tomatoes', quantity: 2, unit: 'pieces' },
            { name: 'Garlic', quantity: 4, unit: 'cloves' },
            { name: 'Ginger', quantity: 2, unit: 'tbsp' },
            { name: 'Curry Powder', quantity: 2, unit: 'tbsp' },
            { name: 'Cumin', quantity: 1, unit: 'tsp' },
            { name: 'Fresh Cilantro', quantity: 0.5, unit: 'cup' }
        ],
        nutrition: {
            calories: 340,
            protein: 12,
            carbs: 38,
            fats: 16,
            fiber: 10
        }
    }
];

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'];
const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const MealPlannerPage = () => {

  const [weekStart, setWeekStart] = useState(startOfWeek(new Date()));
  const [mealPlan, setMealPlan] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

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

  const getDayMeals = (dayIndex) => {
    const date = format(addDays(weekStart, dayIndex), 'yyyy-MM-dd');
    return mealPlan[date] || {};
  };

  const handleAddMeal  = (date, mealType) => {
    setSelectedSlot({ date, mealType });
    setShowAddModal(true);
  }

  const handleRemoveMeal  = (mealId) => {
    if (!confirm('Remove this meal from your plan?')) return;

    // UI-only remove
    const updatedPlan = { ...mealPlan };
    Object.keys(updatedPlan).forEach(date => {
        Object.keys(updatedPlan[date]).forEach(type => {
            if (updatedPlan[date][type].id === mealId) {
                delete updatedPlan[date][type];
            }
        });
    });
    setMealPlan(updatedPlan);
    toast.success('Meal removed');
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
          <div className="flex items-center gap-3">
              <button
                  onClick={() => setWeekStart(addDays(weekStart, -7))}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                  Previous Week
              </button>
              <button
                  onClick={() => setWeekStart(startOfWeek(new Date()))}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
              >
                  This Week
              </button>
              <button
                  onClick={() => setWeekStart(addDays(weekStart, 7))}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                  Next Week
              </button>
          </div>
        </div>
        {/* Week Display */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="text-center">
                <p className="text-sm text-gray-600">Week of</p>
                <p className="text-lg font-semibold text-gray-900">
                    {format(weekStart, 'MMMM d')} - {format(addDays(weekStart, 6), 'MMMM d, yyyy')}
                </p>
            </div>
        </div>
        {/* Calendar Grid */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50">
              <div className="p-4 font-semibold text-gray-700 border-r border-gray-200">
                  Meal
              </div>
              {DAYS_OF_WEEK.map((day, index) => (
                  <div key={day} className="p-4 text-center border-r border-gray-200 last:border-r-0">
                      <div className="font-semibold text-gray-900">{day}</div>
                      <div className="text-sm text-gray-500">
                          {format(addDays(weekStart, index), 'MMM d')}
                      </div>
                  </div>
              ))}
          </div>
          {/* Meal Rows */}
          {MEAL_TYPES.map(mealType => (
            <div key={mealType} className="grid grid-cols-8 border-b border-gray-200 last:border-b-0">
                <div className="p-4 font-medium text-gray-700 capitalize border-r border-gray-200 bg-gray-50">
                    {mealType}
                </div>
                {DAYS_OF_WEEK.map((_, dayIndex) => {
                    const date = format(addDays(weekStart, dayIndex), 'yyyy-MM-dd');
                    const dayMeals = getDayMeals(dayIndex);
                    const meal = dayMeals[mealType];

                    return (
                    <div
                        key={dayIndex}
                        className="p-3 border-r border-gray-200 last:border-r-0 min-h-[100px] hover:bg-gray-50 transition-colors"
                    >
                      {meal ? (
                          <div className="relative group">
                              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                                  <p className="text-sm font-medium text-emerald-900 line-clamp-2">
                                      {meal.recipe_name}
                                  </p>
                                  <button
                                      onClick={() => handleRemoveMeal(meal.id)}
                                      className="absolute top-1 right-1 p-1 bg-white rounded hover:bg-red-50 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                      <X className="w-4 h-4" />
                                  </button>
                              </div>
                          </div>
                      ) : (
                          <button
                              onClick={() => handleAddMeal(date, mealType)}
                              className="w-full h-full flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors group"
                          >
                              <Plus className="w-6 h-6" />
                          </button>
                      )}
                    </div>
                    );
                })}
            </div>
          ))}
        </div>
        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-sm text-gray-600">Meals Planned</p>
                <p className="text-2xl font-bold text-gray-900">
                    {Object.values(mealPlan).reduce((acc, day) => acc + Object.keys(day).length, 0)}
                </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-sm text-gray-600">Total Recipes</p>
                <p className="text-2xl font-bold text-gray-900">{recipes.length}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                    {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d')}
                </p>
            </div>
        </div>
        {/* Add Meal Modal */}
        {showAddModal && selectedSlot && (
          <AddMealModal
              date={selectedSlot.date}
              mealType={selectedSlot.mealType}
              recipes={recipes}
              onClose={() => {
                  setShowAddModal(false);
                  setSelectedSlot(null);
              }}
              onSuccess={(newMeal) => {
                  // Add to local state
                  const updatedPlan = { ...mealPlan };
                  const date = selectedSlot.date;
                  if (!updatedPlan[date]) {
                      updatedPlan[date] = {};
                  }
                  updatedPlan[date][selectedSlot.mealType] = newMeal;
                  setMealPlan(updatedPlan);
                  setShowAddModal(false);
                  setSelectedSlot(null);
              }}
          />
        )}
      </div>
    </div>
  )
}

export default MealPlannerPage