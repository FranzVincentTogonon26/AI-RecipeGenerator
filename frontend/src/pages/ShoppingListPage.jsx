import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import Navbar from '../components/layout/Navbar'
import ShoppingListItem from '../components/layout/ShoppingList/ShoppingListItem';
import AddItemModal from '../components/layout/ShoppingList/AddItemModal';
import ActionSection from '../components/layout/ShoppingList/ActionSection';

import { dummyShoppingListItems } from '../data/dummyData';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Shopping List</h1>
          <p className="text-gray-600 mt-1 font-semibold">
              {totalCount > 0 ? `${checkedCount} of ${totalCount} items checked` : 'Your shopping list is empty'}
          </p>
        </div>

        {/* Actions */}
        <ActionSection 
            totalCount={totalCount} 
            checkedCount={checkedCount} 
            setShowAddModal={setShowAddModal}
            handleAddToPantry={handleAddToPantry}
            handleClearChecked={handleClearChecked}
        />

        {/* Shopping List */}
        <ShoppingListItem
            totalCount={totalCount}
            groupedItems={groupedItems}
            setShowAddModal={setShowAddModal}
            handleToggleChecked={handleToggleChecked}
            onDelete={(idToDelete) => {
                    const updatedItems = items.filter(item => item.id !== idToDelete);
                    setItems(updatedItems);
                    organizeByCategory(updatedItems);
                }}
        />
        
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