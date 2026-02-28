import React, { useState } from 'react'
import { Check, Plus, ShoppingCart, X } from 'lucide-react'
import toast from 'react-hot-toast';

import ModalDelete from '../ModalDelete';

const ShoppingListItem = ({
    totalCount, 
    groupedItems,
    setShowAddModal,
    handleToggleChecked,
    onDelete 
  }) => {

    const [deleteId, setDeleteId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteRequest = (id) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        onDelete(deleteId); 
        toast.success('Meal removed');
        setIsDeleteModalOpen(false);
        setDeleteId(null);
    };

  return (
    <>
    {totalCount > 0 ? (
        <div className="space-y-6">
            {Object.entries(groupedItems).map(([category, categoryItems]) => (
                <div key={category} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                        <h2 className="font-semibold text-gray-900">{category}</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {categoryItems.map(item => (
                        <div key={item.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group">
                            <button
                                onClick={() => handleToggleChecked(item.id)}
                                className="shrink-0"
                            >
                                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${item.is_checked
                                    ? 'bg-emerald-500 border-emerald-500'
                                    : 'border-gray-300 hover:border-emerald-500'
                                    }`}>
                                    {item.is_checked && <Check className="w-4 h-4 text-white" />}
                                </div>
                            </button>

                            <div className="flex-1 min-w-0">
                                <p className={`font-medium ${item.is_checked ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                    {item.ingredient_name}
                                </p>
                                <p className={`text-sm ${item.is_checked ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {item.quantity} {item.unit}
                                    {item.from_meal_plan && (
                                        <span className="ml-2 text-xs text-emerald-600">• From meal plan</span>
                                    )}
                                </p>
                            </div>

                            <button
                                onClick={() => handleDeleteRequest(item.id)}
                                className="shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
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
    {/* Delete Modal */}
    {
        isDeleteModalOpen && (
            <ModalDelete 
                deleteId={deleteId}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                handleConfirmDelete={handleConfirmDelete}
            />
        )
    }
    </>
  )
}

export default ShoppingListItem