import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

import { DIETARY_OPTIONS, CUISINES } from '../../../data/dummyData';

const PreferencesSection = () => {

    const [saving, setSaving] = useState(false);
    const dummyPreferences = {
        user_id: 1,
        dietary_restrictions: ['Vegetarian'],
        preferred_cuisines: ['Italian', 'Mediterranean'],
        default_servings: 4,
        measurement_unit: 'metric'
    }; 

    // Preferences state
    const [preferences, setPreferences] = useState({
        dietary_restrictions: [],
        allergies: [],
        preferred_cuisines: [],
        default_servings: 4,
        measurement_unit: 'metric'
    });

    useEffect(() => {

        const loadPreferences = () => {

            setPreferences({
                dietary_restrictions: dummyPreferences.dietary_restrictions || [],
                allergies: dummyPreferences.allergies || [],
                preferred_cuisines: dummyPreferences.preferred_cuisines || [],
                default_servings: dummyPreferences.default_servings || 4,
                measurement_unit: dummyPreferences.measurement_unit || 'metric'
            });
        };

        loadPreferences();

    }, []);

    const handlePreferencesUpdate = (e) => {
        e.preventDefault();
        // UI-only update
        toast.success('Preferences updated successfully');
        setSaving(false);
    }

    const toggleDietary = (option) => {
        setPreferences(prev => ({
            ...prev,
            dietary_restrictions: prev.dietary_restrictions.includes(option)
                ? prev.dietary_restrictions.filter(d => d !== option)
                : [...prev.dietary_restrictions, option]
        }));
    }

    const toggleCuisine = (cuisine) => {
        setPreferences(prev => ({
            ...prev,
            preferred_cuisines: prev.preferred_cuisines.includes(cuisine)
                ? prev.preferred_cuisines.filter(c => c !== cuisine)
                : [...prev.preferred_cuisines, cuisine]
        }));
    }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Dietary Preferences</h2>

        <form onSubmit={handlePreferencesUpdate} className="space-y-6">
            {/* Dietary Restrictions */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Dietary Restrictions</label>
                <div className="flex flex-wrap gap-2">
                    {DIETARY_OPTIONS.map(option => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => toggleDietary(option)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${preferences.dietary_restrictions.includes(option)
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* Allergies */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allergies (comma-separated)</label>
                <input
                    type="text"
                    value={preferences.allergies.join(', ')}
                    onChange={(e) => setPreferences({
                        ...preferences,
                        allergies: e.target.value.split(',').map(a => a.trim()).filter(Boolean)
                    })}
                    placeholder="e.g., peanuts, shellfish, soy"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
            </div>

            {/* Preferred Cuisines */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Cuisines</label>
                <div className="flex flex-wrap gap-2">
                    {CUISINES.map(cuisine => (
                        <button
                            key={cuisine}
                            type="button"
                            onClick={() => toggleCuisine(cuisine)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${preferences.preferred_cuisines.includes(cuisine)
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {cuisine}
                        </button>
                    ))}
                </div>
            </div>

            {/* Default Servings */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Servings: {preferences.default_servings}
                </label>
                <input
                    type="range"
                    min="1"
                    max="12"
                    value={preferences.default_servings}
                    onChange={(e) => setPreferences({ ...preferences, default_servings: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>12</span>
                </div>
            </div>

            {/* Measurement Unit */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Measurement Unit</label>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => setPreferences({ ...preferences, measurement_unit: 'metric' })}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${preferences.measurement_unit === 'metric'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Metric (kg, L)
                    </button>
                    <button
                        type="button"
                        onClick={() => setPreferences({ ...preferences, measurement_unit: 'imperial' })}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${preferences.measurement_unit === 'imperial'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Imperial (lb, gal)
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Preferences'}
            </button>
        </form>
    </div>
  )
}

export default PreferencesSection