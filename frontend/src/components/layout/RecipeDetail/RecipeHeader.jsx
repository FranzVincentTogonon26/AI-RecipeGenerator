import { useState } from 'react'
import { useNavigate } from 'react-router';
import { Clock, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

import ModalDelete from '../ModalDelete';

const RecipeHeader = ({ recipe }) => {

  const navigate = useNavigate();

  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const totalTime = ( recipe?.prep_time || 0 ) + ( recipe?.cook_time || 0 );

  const handleDeleteRequest = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {

    toast.success(`Recipe deleted.. ${deleteId}`);
    navigate('/recipes');
    
  }

  return (
    <>
    <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
        <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe?.name}</h1>
                {recipe?.description && (
                    <p className="text-gray-600 text-lg">{recipe?.description}</p>
                )}
            </div>
            <button
                onClick={() => handleDeleteRequest(recipe.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
            {recipe?.cuisine_type && (
                <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    {recipe?.cuisine_type}
                </span>
            )}
            {recipe?.difficulty && (
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${recipe?.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    recipe?.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                    {recipe?.difficulty}
                </span>
            )}
            {recipe?.dietary_tags && recipe?.dietary_tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {tag}
                </span>
            ))}
        </div>
        {/* Meta Info */}
        <div className="flex flex-wrap gap-6 text-gray-600">
            <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{totalTime} minutes</span>
            </div>
            {recipe?.prep_time && (
                <div className="text-sm">
                    Prep: {recipe?.prep_time} min
                </div>
            )}
            {recipe?.cook_time && (
                <div className="text-sm">
                    Cook: {recipe?.cook_time} min
                </div>
            )}
        </div>
    </div>
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

export default RecipeHeader