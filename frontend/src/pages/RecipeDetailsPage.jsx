import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast';

import Navbar from '../components/layout/Navbar'
import RecipeHeader from '../components/layout/RecipeDetail/RecipeHeader';
import IngredientsSection from '../components/layout/RecipeDetail/IngredientsSection';
import InstructionsSection from '../components/layout/RecipeDetail/InstructionsSection';
 
import { dummyRecipes } from '../data/dummyData';

const RecipeDetailsPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [servings, setServings] = useState(4);
 

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
    
  }, [id, navigate]);

  if(!recipe) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

         {/* Back Button */}
          <Link
              to="/recipes"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors font-semibold"
          >
              <ArrowLeft className="w-5 h-5" />
              Back to Recipes
          </Link>

          {/* Recipe Header */}
          <RecipeHeader recipe={recipe} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ingredients Section */}
            <IngredientsSection recipe={recipe} servings={servings} setServings={setServings} />
            
            {/* Instructions Section */}
            <InstructionsSection recipe={recipe} />
            
          </div>
      </div>
    </div>
  )
}

export default RecipeDetailsPage