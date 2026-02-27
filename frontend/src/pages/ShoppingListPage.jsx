import React, { useEffect, useState } from 'react'
import { Plus, ShoppingCart, Trash2 } from 'lucide-react';

import Navbar from '../components/layout/Navbar'
import ShoppingListItem from '../components/layout/ShoppingListItem';
import AddItemModal from '../components/layout/AddItemModal';
import toast from 'react-hot-toast';

const dummyShoppingListItems = [
    {
        id: 1,
        user_id: 1,
        ingredient_name: 'Heavy Cream',
        quantity: 200,
        unit: 'ml',
        category: 'Dairy',
        is_checked: false,
        from_meal_plan: true,
        created_at: '2024-02-10T15:00:00Z'
    },
    {
        id: 2,
        user_id: 1,
        ingredient_name: 'Fresh Mozzarella',
        quantity: 250,
        unit: 'g',
        category: 'Dairy',
        is_checked: false,
        from_meal_plan: true,
        created_at: '2024-02-10T15:05:00Z'
    },
    {
        id: 3,
        user_id: 1,
        ingredient_name: 'Pizza Dough',
        quantity: 500,
        unit: 'g',
        category: 'Grains',
        is_checked: true,
        from_meal_plan: true,
        created_at: '2024-02-10T15:10:00Z'
    },
    {
        id: 4,
        user_id: 1,
        ingredient_name: 'Broccoli',
        quantity: 200,
        unit: 'g',
        category: 'Vegetables',
        is_checked: false,
        from_meal_plan: true,
        created_at: '2024-02-10T15:15:00Z'
    },
    {
        id: 5,
        user_id: 1,
        ingredient_name: 'Snap Peas',
        quantity: 150,
        unit: 'g',
        category: 'Vegetables',
        is_checked: false,
        from_meal_plan: true,
        created_at: '2024-02-10T15:20:00Z'
    },
    {
        id: 6,
        user_id: 1,
        ingredient_name: 'Lime',
        quantity: 2,
        unit: 'pieces',
        category: 'Fruits',
        is_checked: false,
        from_meal_plan: false,
        created_at: '2024-02-10T15:25:00Z'
    },
    {
        id: 7,
        user_id: 1,
        ingredient_name: 'Cucumber',
        quantity: 1,
        unit: 'pieces',
        category: 'Vegetables',
        is_checked: true,
        from_meal_plan: true,
        created_at: '2024-02-10T15:30:00Z'
    },
    {
        id: 8,
        user_id: 1,
        ingredient_name: 'Kalamata Olives',
        quantity: 50,
        unit: 'g',
        category: 'Other',
        is_checked: false,
        from_meal_plan: true,
        created_at: '2024-02-10T15:35:00Z'
    }
];

const ShoppingListPage = () => {

  const [items, setItems] = useState([]);
  const [groupedItems, setGroupedItems] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);

  const checkedCount = items.filter(item => item.is_checked).length;
  const totalCount = items.length;

  const organizeByCategory = (itemsList) => {
      const grouped = {};
      itemsList.forEach(item => {
          const category = item.category || 'Other';
          if (!grouped[category]) {
              grouped[category] = [];
          }
          grouped[category].push(item);
      });
      setGroupedItems(grouped);
  };

  useEffect(() => {
    const loadShoppingList = () => {
      setItems(dummyShoppingListItems);
      organizeByCategory(dummyShoppingListItems);
    };

    loadShoppingList();

  }, []);

  const handleAddToPantry = () => {
    const checkedCount = items.filter(item => item.is_checked).length;
    if (checkedCount === 0) {
        toast.error('No items checked');
        return;
    }

    if (!confirm(`Add ${checkedCount} checked items to pantry?`)) return;

    // UI-only add to pantry
    const updatedItems = items.filter(item => !item.is_checked);
    setItems(updatedItems);
    organizeByCategory(updatedItems);
    toast.success('Items added to pantry');
  }

  const handleClearChecked = () => {
    if (!confirm('Remove all checked items?')) return;

    // UI-only clear
    const updatedItems = items.filter(item => !item.is_checked);
    setItems(updatedItems);
    organizeByCategory(updatedItems);
    toast.success('Checked items cleared');
  }

  const handleToggleChecked = (id) => {
    // UI-only toggle
    const updatedItems = items.map(item =>
        item.id === id ? { ...item, is_checked: !item.is_checked } : item
    );
    setItems(updatedItems);
    organizeByCategory(updatedItems);
  }

  const handleDeleteItem = (id) => {
    // UI-only delete
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    organizeByCategory(updatedItems);
    toast.success('Item removed');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Shopping List</h1>
          <p className="text-gray-600 mt-1">
              {totalCount > 0 ? `${checkedCount} of ${totalCount} items checked` : 'Your shopping list is empty'}
          </p>
        </div>

        {/* Actions */}
        {totalCount > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
              <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
              >
                  <Plus className="w-5 h-5" />
                  Add Item
              </button>
              {checkedCount > 0 && (
                  <>
                      <button
                          onClick={handleAddToPantry}
                          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                      >
                          <ShoppingCart className="w-5 h-5" />
                          Add to Pantry ({checkedCount})
                      </button>
                      <button
                          onClick={handleClearChecked}
                          className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg font-medium transition-colors"
                      >
                          <Trash2 className="w-5 h-5" />
                          Clear Checked
                      </button>
                  </>
              )}
          </div>
        )}

        {/* Shopping List */}
        {totalCount > 0 ? (
          <div className="space-y-6">
              {Object.entries(groupedItems).map(([category, categoryItems]) => (
                  <div key={category} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                          <h2 className="font-semibold text-gray-900">{category}</h2>
                      </div>
                      <div className="divide-y divide-gray-100">
                          {categoryItems.map(item => (
                              <ShoppingListItem
                                  key={item.id}
                                  item={item}
                                  onToggle={handleToggleChecked}
                                  onDelete={handleDeleteItem}
                              />
                          ))}
                      </div>
                  </div>
              ))}
          </div>
        ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Your shopping list is empty</p>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add First Item
                </button>
            </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
          <AddItemModal
              onClose={() => setShowAddModal(false)}
              onSuccess={(newItem) => {
                  // Add to local state
                  const updatedItems = [...items, newItem];
                  setItems(updatedItems);
                  organizeByCategory(updatedItems);
                  setShowAddModal(false);
              }}
          />
      )}

    </div>
  )
}

export default ShoppingListPage