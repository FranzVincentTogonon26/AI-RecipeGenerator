import React, { useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import { Link, useNavigate, useParams } from 'react-router'
import { ArrowLeft, Clock, Trash2, Users } from 'lucide-react'
import toast from 'react-hot-toast';

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

const NutritionCard = ({ label, value, unit }) => (
    <div className="text-center p-4 bg-gray-50 rounded-lg">
        <div className="text-2xl font-bold text-gray-900">{value}{unit}</div>
        <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
);

const RecipeDetailsPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [servings, setServings] = useState(4);
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());

  const totalTime = ( recipe?.prep_time || 0 ) + ( recipe?.cook_time || 0 );
  const originalServings = recipe?.servings || 4;

  useEffect(() => {
    const loadRecipe = () => {
      const recipeData = dummyRecipes.find((recipe) => recipe.id === parseInt(id));
      if (recipeData) {
          setRecipe(recipeData);
          setServings(recipeData.servings || 4);
      } else {
          toast.error('Recipe not found');
          navigate('/recipes');
      }
    };

    loadRecipe();
    
  }, [id, navigate])

  const handleDelete = () => {

  }

  const toggleIngredient = () => {

  }

  const adjustQuantity = (originalQty, originalServings) => {
    return ((originalQty * servings) / originalServings).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

         {/* Back Button */}
          <Link
              to="/recipes"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
              <ArrowLeft className="w-5 h-5" />
              Back to Recipes
          </Link>

          {/* Recipe Header */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe?.name}</h1>
                    {recipe?.description && (
                        <p className="text-gray-600 text-lg">{recipe?.description}</p>
                    )}
                </div>
                <button
                    onClick={handleDelete}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                {recipe?.cuisine_type && (
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                        {recipe?.cuisine_type}
                    </span>
                )}
                {recipe?.difficulty && (
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${recipe?.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                        recipe?.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                        {recipe?.difficulty}
                    </span>
                )}
                {recipe?.dietary_tags && recipe?.dietary_tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {tag}
                    </span>
                ))}
            </div>
            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{totalTime} minutes</span>
                </div>
                {recipe?.prep_time && (
                    <div className="text-sm">
                        Prep: {recipe?.prep_time} min
                    </div>
                )}
                {recipe?.cook_time && (
                    <div className="text-sm">
                        Cook: {recipe?.cook_time} min
                    </div>
                )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ingredients Section */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Ingredients</h2>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Servings:</span>
                        </div>
                    </div>

                    {/* Servings Adjuster */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setServings(Math.max(1, servings - 1))}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                            >
                                −
                            </button>
                            <span className="text-lg font-semibold text-gray-900 w-12 text-center">
                                {servings}
                            </span>
                            <button
                                onClick={() => setServings(servings + 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                            >
                                +
                            </button>
                            {servings !== originalServings && (
                                <button
                                    onClick={() => setServings(originalServings)}
                                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Ingredients List */}
                    <div className="space-y-3">
                        {recipe?.ingredients && recipe.ingredients.map((ingredient, index) => {
                            const adjustedQty = adjustQuantity(ingredient.quantity, originalServings);
                            const isChecked = checkedIngredients.has(index);

                            return (
                                <label
                                    key={index}
                                    className="flex items-start gap-3 cursor-pointer group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => toggleIngredient(index)}
                                        className="mt-1 w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
                                    />
                                    <span className={`flex-1 ${isChecked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                        <span className="font-medium">{adjustedQty}</span> {ingredient.unit} {ingredient.name}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* Instructions Section */}
            <div className="lg:col-span-2 space-y-6">

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h2>
                <ol className="space-y-4">
                    {recipe?.instructions && recipe.instructions.map((step, index) => (
                        <li key={index} className="flex gap-4">
                            <span className="shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                {index + 1}
                            </span>
                            <p className="text-gray-700 pt-1 flex-1">{step}</p>
                        </li>
                    ))}
                </ol>
              </div>

              {/* Nutrition Info */}
              {recipe?.nutrition && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Nutrition (per serving)</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                          <NutritionCard label="Calories" value={recipe.nutrition.calories} unit="kcal" />
                          <NutritionCard label="Protein" value={recipe.nutrition.protein} unit="g" />
                          <NutritionCard label="Carbs" value={recipe.nutrition.carbs} unit="g" />
                          <NutritionCard label="Fats" value={recipe.nutrition.fats} unit="g" />
                          <NutritionCard label="Fiber" value={recipe.nutrition.fiber} unit="g" />
                      </div>
                  </div>
              )}

              {/* User Notes */}
              {recipe?.user_notes && (
                  <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6">
                      <h3 className="font-semibold text-emerald-900 mb-2">📝 Notes</h3>
                      <p className="text-emerald-800">{recipe?.user_notes}</p>
                  </div>
              )}

            </div>
          </div>
      </div>
    </div>
  )
}

export default RecipeDetailsPage