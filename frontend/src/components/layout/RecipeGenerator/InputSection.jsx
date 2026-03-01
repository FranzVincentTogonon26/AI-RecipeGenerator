import React, { useState } from 'react'
import { Plus, Sparkles, X } from 'lucide-react';
import toast from 'react-hot-toast';

import { CUISINES, COOKING_TIMES, DIETARY_OPTIONS, dummyGeneratedRecipe } from '../../../data/dummyData';

const InputSection = ({generate}) => {

  const [ingredients, setIngredients] = useState([]);
  const [cuisineType, setCuisineType] = useState('Any');
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [servings, setServings] = useState(5);
  const [cookingTime, setCookingTime] = useState('medium');
  const [usePantry, setUsePantry] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [generating, setGenerating] = useState(false);

  const addIngredient = () => {
    if(inputValue.trim() && !ingredients.includes(inputValue.trim())){
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue('');
    }
  }

  const handleGenerate = () => {
    if(!usePantry && ingredients.length === 0){
      toast.error('Please add at least one ingredient or use pantry items.');
      return;
    }

    setGenerating(true);

    // Simulate API delay
    setTimeout(() => {
      generate(dummyGeneratedRecipe) 
      toast.success('Recipe generated successully..');
      setGenerating(false);
    }, 1500)

  }

  const removeIngredient = () => {
    setIngredients(ingredients.filter( i => i != ingredients ));
  }

  const toggleDietary = (option) => {
    if(dietaryRestrictions.includes(option)){
      setDietaryRestrictions(dietaryRestrictions.filter( diet => diet != option ));
    } else {
      setDietaryRestrictions([...dietaryRestrictions, option])
    }
  }

  return (
    <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ingredients</h2>

        {/* Use Pantry Toggle */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-emerald-50 rounded-lg">
            <label htmlFor="use-pantry" className="text-sm font-medium text-emerald-900 label">
                <input
                    type="checkbox"
                    id="use-pantry"
                    checked={usePantry}
                    onChange={(e) => setUsePantry(e.target.checked)}
                    className="checkbox checkbox-sm text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
                />
                Use ingredients from my pantry
            </label>
        </div>

        {/* Manual Ingredient Input */}
        <div className="flex gap-2 mb-4">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                placeholder="Add ingredient (e.g., tomatoes)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
            <button
                onClick={addIngredient}
                className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
                <Plus className="w-5 h-5" />
            </button>
        </div>

        {/* Ingredient Tags */}
        {ingredients.length > 0 && (
            <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold"
                    >
                        {ingredient}
                        <button
                            onClick={() => removeIngredient(ingredient)}
                            className="hover:text-red-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </span>
                ))}
            </div>
        )}

        </div>
        
        {/* Preferences */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
            {/* Cuisine Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label>
                <select
                    value={cuisineType}
                    onChange={(e) => setCuisineType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                    {CUISINES.map(cuisine => (
                        <option key={cuisine} value={cuisine}>{cuisine}</option>
                    ))}
                </select>
            </div>
            {/* Dietary Restrictions */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
                <div className="flex flex-wrap gap-2">
                    {DIETARY_OPTIONS.map(option => (
                        <button
                            key={option}
                            onClick={() => toggleDietary(option)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${dietaryRestrictions.includes(option)
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            {/* Servings */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Servings: {servings}
                </label>
                <input
                    type="range"
                    min="1"
                    max="12"
                    value={servings}
                    onChange={(e) => setServings(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>12</span>
                </div>
            </div>
            {/* Cooking Time */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cooking Time</label>
                <div className="grid grid-cols-3 gap-2">
                    {COOKING_TIMES.map(time => (
                        <button
                            key={time.value}
                            onClick={() => setCookingTime(time.value)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${cookingTime === time.value
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {time.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
        {/* Generate Button */}
        <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {generating ? (
                <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating Recipe...
                </>
            ) : (
                <>
                    <Sparkles className="w-5 h-5" />
                    Generate Recipe
                </>
            )}
        </button>
    </div>
  )
}

export default InputSection