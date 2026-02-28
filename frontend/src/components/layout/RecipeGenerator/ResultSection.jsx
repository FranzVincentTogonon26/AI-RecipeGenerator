import { ChefHat, Clock, Users } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const ResultSection = ({ generatedRecipe, setGeneratedRecipe }) => {

  const [saving, setSaving] = useState(false);

  const handleSaveRecipe = () => {
    if (!generatedRecipe) return;
    // UI-only save (no API call)
    toast.success('Recipe saved to your collection!');
    setSaving(false)
  };

  return (
    <div>
        { generatedRecipe ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        {/* Recipe Header */}
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{generatedRecipe?.name}</h2>
            <p className="text-gray-600">{generatedRecipe?.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    {generatedRecipe.cuisineType}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
                    {generatedRecipe.difficulty}
                </span>
                {generatedRecipe.dietaryTags?.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{generatedRecipe.prepTime + generatedRecipe.cookTime} mins</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{generatedRecipe.servings} servings</span>
                </div>
            </div>
        </div>
        {/* Ingredients */}
        <div>
            <h3 className="font-semibold text-gray-900 mb-3">Ingredients</h3>
            <ul className="space-y-2">
                {generatedRecipe.ingredients?.map((ing, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        {ing.quantity} {ing.unit} {ing.name}
                    </li>
                ))}
            </ul>
        </div>
        {/* Instructions */}
        <div>
            <h3 className="font-semibold text-gray-900 mb-3">Instructions</h3>
            <ol className="space-y-3">
                {generatedRecipe.instructions?.map((step, index) => (
                    <li key={index} className="flex gap-3">
                        <span className="shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                        </span>
                        <span className="text-gray-700 pt-0.5">{step}</span>
                    </li>
                ))}
            </ol>
        </div>
        {/* Nutrition */}
        {generatedRecipe.nutrition && (
            <div>
                <h3 className="font-semibold text-gray-900 mb-3">Nutrition (per serving)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    <NutritionBadge label="Calories" value={generatedRecipe.nutrition.calories} unit="kcal" />
                    <NutritionBadge label="Protein" value={generatedRecipe.nutrition.protein} unit="g" />
                    <NutritionBadge label="Carbs" value={generatedRecipe.nutrition.carbs} unit="g" />
                    <NutritionBadge label="Fats" value={generatedRecipe.nutrition.fats} unit="g" />
                    <NutritionBadge label="Fiber" value={generatedRecipe.nutrition.fiber} unit="g" />
                </div>
            </div>
        )}
        {/* Cooking Tips */}
        {generatedRecipe.cookingTips && generatedRecipe.cookingTips.length > 0 && (
            <div className="bg-emerald-50 rounded-lg p-4">
                <h3 className="font-semibold text-emerald-900 mb-2">💡 Cooking Tips</h3>
                <ul className="space-y-1">
                    {generatedRecipe.cookingTips.map((tip, index) => (
                        <li key={index} className="text-sm text-emerald-800">• {tip}</li>
                    ))}
                </ul>
            </div>
        )}
        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
                onClick={handleSaveRecipe}
                disabled={saving}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
                {saving ? 'Saving...' : 'Save Recipe'}
            </button>
            <button
                onClick={() => setGeneratedRecipe(null)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
                New Recipe
            </button>
        </div>
        </div>
        ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center h-full flex flex-col items-center justify-center">
                <ChefHat className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500">Your generated recipe will appear here</p>
            </div>
        )}
    </div>
  )
}

const NutritionBadge = ({ label, value, unit }) => (
    <div className="text-center p-3 bg-gray-50 rounded-lg">
        <div className="text-lg font-bold text-gray-900">{value}{unit}</div>
        <div className="text-xs text-gray-600">{label}</div>
    </div>
);

export default ResultSection