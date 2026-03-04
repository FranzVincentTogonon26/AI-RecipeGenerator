import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast';

import Navbar from '../components/layout/Navbar'
import RecipeHeader from '../components/layout/RecipeDetail/RecipeHeader';
import IngredientsSection from '../components/layout/RecipeDetail/IngredientsSection';
import InstructionsSection from '../components/layout/RecipeDetail/InstructionsSection';
import Spinner from '../components/layout/Spinner'

import myRecipeService from '../services/myRecipeService';

const RecipeDetailsPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [servings, setServings] = useState(4);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {

    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await myRecipeService.getRecipeDetails(id);
        setRecipe(response);
        setServings(response.servings || 4);
      } catch (error) {
        toast.error('Failed to load recipe details.', error);
        navigate('/recipes');
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe();
    
  }, [id]);

  if(!recipe) return null;

  const renderContent = () => {
    if(loading){
      return (
        <Spinner />
      )
    }
    return (
      <>
        {/* Recipe Header */}
        <RecipeHeader recipe={recipe} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ingredients Section */}
          <IngredientsSection recipe={recipe} servings={servings} setServings={setServings} />
          
          {/* Instructions Section */}
          <InstructionsSection recipe={recipe} />
          
        </div>
      </>
    )
  }

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
          {renderContent()}
      </div>
    </div>
  )
}

export default RecipeDetailsPage