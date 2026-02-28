import React, { useEffect, useState } from 'react'
import { Calendar, ChefHat, UtensilsCrossed } from 'lucide-react';
import { dummyStats } from '../../../data/dummyData';

const StatCard = () => {

    const [stats, setStats] = useState({
        totalRecipes: 0,
        pantryItems: 0,
        mealsThisWeek: 0
      });
    
    useEffect(() => {
        // Load dummy data
        setStats({
            totalRecipes: dummyStats.recipes.total_recipes,
            pantryItems: dummyStats.pantry.total_items,
            mealsThisWeek: dummyStats.mealPlans.this_week_count
        });

    }, []);

    const StatsCard = [
        { label: 'Total Recipes', icon: ChefHat, value: stats.totalRecipes, color: 'bg-emerald-100 text-emerald-600' },
        { label: 'Pantry Items', icon: UtensilsCrossed, value: stats.pantryItems, color: 'bg-blue-100 text-blue-600' },
        { label: 'Meals This Week', icon: Calendar, value: stats.mealsThisWeek, color: 'bg-purple-100 text-purple-600' }
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