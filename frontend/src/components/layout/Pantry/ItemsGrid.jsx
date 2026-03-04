import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, X } from 'lucide-react';
import toast from 'react-hot-toast';

import ModalDelete from '../ModalDelete';
import pantryService from '../../../services/pantryService';

const ItemsGrid = ({
    filteredItems,
    onDeleteItem
  }) => {

  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteRequest = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {

    try {
      await pantryService.pantryDeleteItem(deleteId);
      onDeleteItem(deleteId);
      toast.success('Item deleted');
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    } catch (error) {
      toast.error('Failed to delete item.', error);
    }
   
  };

  return (
    <>
    {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item, index) => {

                const today = new Date();
                today.setHours(0,0,0,0); // start of today

                const sevenDaysFromNow = new Date();
                sevenDaysFromNow.setDate(today.getDate() + 7);
                sevenDaysFromNow.setHours(23,59,59,999); // end of 7th day

                const expiryDate = item?.expiry_date ? new Date(item.expiry_date) : null;

                const isExpired = expiryDate && expiryDate < today;
                const isExpiring = expiryDate && expiryDate >= today && expiryDate <= sevenDaysFromNow;

                return (
                    <div key={index} className={`rounded-lg border p-4 hover:shadow-md transition-shadow ${ isExpired ? 'border-red-200 bg-linear-to-r from-red-100 to-red-200' : isExpiring ? 'border-amber-200 bg-amber-50 ' : 'border-gray-200 bg-white '
                        }`}>
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{item?.name}</h3>
                                <p className="text-sm text-gray-500 capitalize">{item?.category}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteRequest(item?.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
            
                        <div className="space-y-2">
                            <div className="flex items-center justify-start text-sm">
                                <span className="text-gray-600">Quantity:</span>
                                <span className="font-medium text-gray-900 ml-2">
                                    {Number(item?.quantity)} {item?.unit}
                                </span>
                            </div>
            
                            {item?.expiry_date && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span className={`${isExpired ? 'text-red-600 font-medium' : isExpiring ? 'text-amber-600 font-medium' : 'text-gray-600'}`}>
                                        {isExpired ? 'Expired' : 'Expires'}: {format(new Date(item?.expiry_date), 'MMM dd, yyyy')}
                                    </span>
                                </div>
                            )}
            
                            {item?.is_running_low && (
                                <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 border border-orange-200 text-xs font-medium rounded">
                                    Running Low
                                </span>
                            )}
                        </div>
                    </div>
                )
            }
            )}
        </div>
    ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No items found</p>
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

export default ItemsGrid