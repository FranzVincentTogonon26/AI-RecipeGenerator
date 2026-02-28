import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Calendar, X } from 'lucide-react';
import ModalDelete from '../../ModalDelete';
import toast from 'react-hot-toast';

const ItemsGrid = ({
    filteredItems
  }) => {

  const [items, setItems] = useState(filteredItems);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setItems(filteredItems);
  }, [filteredItems]);

  const handleDeleteRequest = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setItems((prev) => prev.filter((item) => item.id !== deleteId));
    toast.success('Item deleted');
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };


  return (
    <>
    {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => {
                const isExpired = item.expiry_date && new Date(item.expiry_date) < new Date();
                return (
                    <div key={index} className={`rounded-lg border p-4 hover:shadow-md transition-shadow ${isExpired ? 'border-red-500 bg-red-100/50 ' : 'border-gray-200 bg-white '
                        }`}>
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteRequest(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
            
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Quantity:</span>
                                <span className="font-medium text-gray-900">
                                    {item.quantity} {item.unit}
                                </span>
                            </div>
            
                            {item.expiry_date && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span className={`${isExpired ? 'text-red-600 font-medium' : isExpired ? 'text-amber-600 font-medium' : 'text-gray-600'}`}>
                                        {isExpired ? 'Expired' : 'Expires'}: {format(new Date(item.expiry_date), 'MMM dd, yyyy')}
                                    </span>
                                </div>
                            )}
            
                            {item.is_running_low && (
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