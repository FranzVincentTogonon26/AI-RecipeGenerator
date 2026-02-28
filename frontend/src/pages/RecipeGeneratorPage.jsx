import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'

import Navbar from '../components/layout/Navbar'
import InputSection from '../components/layout/RecipeGenerator/InputSection';
import ResultSection from '../components/layout/RecipeGenerator/ResultSection';

const RecipeGeneratorPage = () => {

  const [generatedRecipe, setGeneratedRecipe] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">AI Recipe Generator</h1>
              <p className="text-gray-600 mt-2">Let AI create delicious recipes based on your ingredients</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <InputSection 
                generate={(newItem) => {
                    setGeneratedRecipe(newItem);
                }}
            />

            {/* Results Section */}
            <ResultSection 
                generatedRecipe={generatedRecipe}
                setGeneratedRecipe={setGeneratedRecipe} 
            />

          </div>
      </div>
    </div>
  )
}

export default RecipeGeneratorPage