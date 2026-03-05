import axiosInstance from '../libs/axiosInstance'
import { API_PATHS } from '../libs/apiPaths'

const getShoppingList = async () => {
    try {
        const response = await axiosInstance.get(API_PATHS.SHOPPING_LIST.SHOPPING_LIST);
        return response.data.data.items;
    } catch (error) {
         throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const addItem = async (formData) => {
    try {
        const response = await axiosInstance.post(API_PATHS.SHOPPING_LIST.SHOPPING_LIST_ADD, {
            ...formData,
            quantity: parseFloat(formData.quantity)
        });
        return response.data.data.item;
    } catch (error) {
         throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const deleteItem = async (id) => {
    try {
        const response = await axiosInstance.delete(API_PATHS.SHOPPING_LIST.SHOPPING_LIST_DELETE(id));
        return response.data.data; 
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const toggleItem = async (id) => {
    try {
        const response = await axiosInstance.put(API_PATHS.SHOPPING_LIST.TOGGLE_ITEM(id));
        return response.data.data; 
    } catch (error) {
         throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const deleteAllChecked = async () => {
    try {
        const response = await axiosInstance.delete(API_PATHS.SHOPPING_LIST.DELETE_ALL_CHECKED);
        return response.data.data; 
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const addItemToPantry = async () => {
    try {
        const response = await axiosInstance.post(API_PATHS.SHOPPING_LIST.ITEMS_ADD_TO_PANTRY);
        return response.data.data;  
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const shoppingListService = {
    getShoppingList,
    addItem,
    deleteItem,
    toggleItem,
    deleteAllChecked,
    addItemToPantry
}

export default shoppingListService;