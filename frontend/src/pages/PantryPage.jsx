import React, { useEffect, useState } from 'react'
import { AlertCircle, Plus } from 'lucide-react';

import Navbar from '../components/layout/Navbar'
import AddItemModal from '../components/layout/Pantry/AddItemModal';
import SearchAndFilter from '../components/layout/Pantry/SearchAndFilter';
import ItemsGrid from '../components/layout/Pantry/ItemsGrid';

import { CATEGORIES, dummyPantryItems } from '../data/dummyData';

const PantryPage = () => {

  const [items, setItems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [expiringItems, setExpiringItems] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const category = CATEGORIES;

  useEffect(() => {
    setItems(dummyPantryItems);
  }, []);

  useEffect(() => {
    getExpiringItems();
    filterItems();
  }, [items, searchQuery, selectedCategory]);

  const getExpiringItems = () => {
    const today = new Date();
    const count = dummyPantryItems.filter(
        (item) => item.expiry_date && new Date(item.expiry_date) < today
    ).length;
    setExpiringItems(count);
  };

  const filterItems = () => {
    let filtered = items;
    if (searchQuery) {
        filtered = filtered.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    if (selectedCategory !== 'All') {
        filtered = filtered.filter(item => item.category === selectedCategory);
    }
    setFilteredItems(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Pantry</h1>
                    <p className="text-gray-600 mt-1">Manage your ingredients and track expiry dates</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Item
                </button>
            </div>

          {/* Expiring Soon Alert */}
            {expiringItems > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                            <h3 className="font-medium text-amber-900">Items Expiring Soon</h3>
                            <p className="text-sm text-amber-700 mt-1 ">
                                <span className="font-bold">{expiringItems}</span> item{expiringItems > 1 ? 's' : ''} expiring within 7 days
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Search and Filter */}
            <SearchAndFilter
                category={category}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            {/* Items Grid */}
            <ItemsGrid 
                filteredItems={filteredItems}
            />
              
        </div>

        {/* Add Item Modal */}
        {showAddModal && (
            <AddItemModal
                categoryList={category}
                onClose={() => setShowAddModal(false)}
                onSuccess={(newItem) => {
                    setItems([...items, newItem]);
                }}
            />
        )}
    </div>
  )
}

export default PantryPage