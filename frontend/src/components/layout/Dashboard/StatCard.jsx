import { Calendar, ChefHat, UtensilsCrossed } from 'lucide-react';

const StatCard = ({statsCard}) => {

    const StatsCard = [
        { label: 'Total Recipes', icon: ChefHat, value: statsCard.totalRecipes, color: 'bg-emerald-100 text-emerald-600' },
        { label: 'Pantry Items', icon: UtensilsCrossed, value: statsCard.pantryItems, color: 'bg-blue-100 text-blue-600' },
        { label: 'Meals This Week', icon: Calendar, value: statsCard.mealsThisWeek, color: 'bg-purple-100 text-purple-600' }
    ];
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        { StatsCard.map((card, index) => (
        <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}>
                    <card.icon
                        size={18}
                        strokeWidth={2.5}
                    />
                </div>
                <div>
                    <p className="text-sm text-gray-600">{card.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
            </div>
        </div>
        ))
        }
    </div>
  )
}

export default StatCard