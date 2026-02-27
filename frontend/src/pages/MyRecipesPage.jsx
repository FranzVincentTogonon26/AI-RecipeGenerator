import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { ChefHat, Search } from 'lucide-react'

import Navbar from '../components/layout/Navbar'
import RecipeCardpage from '../components/layout/RecipeCardpage';
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

const MyRecipesPage = () => {

  const cuisines = ['All', 'Italian', 'Mexican', 'Indian', 'Chinese', 'Japanese', 'Thai', 'French', 'Mediterranean', 'American'];
  const difficulties = ['All', 'easy', 'medium', 'hard'];

  const [recipes, setRecipes] = useState(dummyRecipes); // Array List
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const filteredRecipes = () => {
      let filtered = recipes;

      if(searchQuery){
        filtered = filtered.filter(
          recipe =>  recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) || recipe.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if(selectedCuisine !== 'All'){
        filtered = filtered.filter( recipe => recipe.cuisine_type === selectedCuisine );
      }

      if(selectedDifficulty !== 'All'){
        filtered = filtered.filter( recipe => recipe.difficulty === selectedDifficulty );
      }

      setFilteredRecipes(filtered);

    }

    filteredRecipes();

  }, [recipes, searchQuery, selectedCuisine, selectedDifficulty]);

  const handleDelete = (id) => {
    if(!confirm('Are you sure you want to delete this recipr?')) return;

    setRecipes(recipes.filter( recipe => recipe.id !== id ));
    toast.success('Recipe deleted..')
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Header */}
          <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">My Recipes</h1>
              <p className="text-gray-600 mt-1">Your collection of saved recipes</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">

              {/* Search */}
              <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search recipes..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
              </div>
              {/* Cuisine Filter */}
              <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                  {cuisines.map(cuisine => (
                      <option key={cuisine} value={cuisine}>
                          {cuisine === 'All' ? 'All Cuisines' : cuisine}
                      </option>
                  ))}
              </select>
              {/* Difficulty Filter */}
              <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                  {difficulties.map(diff => (
                      <option key={diff} value={diff}>
                          {diff === 'All' ? 'All Difficulties' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                      </option>
                  ))}
              </select>

            </div>
          </div>

          {/* Recipe Count */}
          <div className="mb-4">
              <p className="text-sm text-gray-600">
                  Showing {filteredRecipes.length} of {recipes.length} recipes
              </p>
          </div>
          {/* Recipes Grid */}
          { filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map(recipe => (
                      <RecipeCardpage
                          key={recipe.id}
                          recipe={recipe}
                          onDelete={handleDelete}
                      />
                  ))}
              </div>
           ) : (
               <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                   <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                   <p className="text-gray-500 mb-4">
                       {recipes.length === 0 ? 'No recipes yet' : 'No recipes match your filters'}
                   </p>
                   {recipes.length === 0 && (
                       <Link
                           to="/generate"
                           className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                       >
                           Generate Your First Recipe
                       </Link>
                   )}
               </div>
           )}

        </div>
    </div>
  )
}

export default MyRecipesPage