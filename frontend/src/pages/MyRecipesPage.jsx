import { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { ChefHat } from 'lucide-react'
import toast from 'react-hot-toast';

import Navbar from '../components/layout/Navbar'
import RecipeCardpage from '../components/layout/MyRecipe/RecipeCardpage';
import SearchFilter from '../components/layout/MyRecipe/SearchFilter';
import Spinner from '../components/layout/Spinner';
import myRecipeService from '../services/myRecipeService';

import { CUISINES, difficulties } from '../data/dummyData';

const MyRecipesPage = () => {

  const [recipes, setRecipes] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const cuisines = CUISINES;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true)
        const response = await myRecipeService.myRecipeList();
        setRecipes(response)
      } catch (error) {
        toast.error('Failed to load recipes..', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes();
  }, []);

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

  const renderContent = () => {
    if(loading){
      return (
          <Spinner />
        );
    }
    return (
      <>
        {/* Header */}
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Recipes</h1>
            <p className="text-gray-600 mt-1">Your collection of saved recipes</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <SearchFilter 
              cuisines={cuisines}
              difficulties={difficulties}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCuisine={selectedCuisine}
              setSelectedCuisine={setSelectedCuisine}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
          />
        </div>

        {/* Recipe Count */}
        <div className="mb-4">
            <p className="text-md font-semibold text-gray-600">
                Showing {filteredRecipes.length} of {recipes.length} recipes
            </p>
        </div>
        {/* Recipes Grid */}
        { filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe, index) => (
                    <RecipeCardpage
                        key={index}
                        recipeData={recipe}
                        onDelete={(idToDelete) => {
                              setRecipes(prev => prev.filter(recipes => recipes.id !== idToDelete));
                          }}
                    />
                ))}
            </div>
          ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4 font-semibold">
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
      </>
    )
    
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </div>
    </div>
  )
}

export default MyRecipesPage