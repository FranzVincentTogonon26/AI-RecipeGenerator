import React from 'react'
import { Plus, ShoppingCart, Trash2 } from 'lucide-react'

const ActionSection = ({ 
    totalCount, 
    checkedCount,
    setShowAddModal,
    handleAddToPantry,
    handleClearChecked 
 }) => {
  return (
    <>
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
                        className="flex items-center gap-2 border bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-semibold  px-4 py-2.5 rounded-lg font-medium transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                        Delete All Checked
                    </button>
                </>
            )}
        </div>
    )}
    </>
  )
}

export default ActionSection