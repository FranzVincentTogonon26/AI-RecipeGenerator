import React from 'react'

const InstructionsSection = ({ recipe }) => {
 
  const NutritionCard = [
    { label: 'Calories', value: recipe.nutrition.calories, unit: 'kcal' },
    { label: 'Protein', value: recipe.nutrition.protein, unit: 'g' },
    { label: 'Carbs', value: recipe.nutrition.carbs, unit: 'g' },
    { label: 'Fats', value: recipe.nutrition.fats, unit: 'g' },
    { label: 'Fibers', value: recipe.nutrition.fiber, unit: 'g' }
  ];

  return (
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
                    { NutritionCard.map((card, index) => (
                        <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">{card.value} {card.unit}</div>
                            <div className="text-sm text-gray-600 mt-1">{card.label}</div>
                        </div>
                     ))
                    }
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
  )
}

export default InstructionsSection