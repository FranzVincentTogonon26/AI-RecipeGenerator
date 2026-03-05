import axiosInstance from '../libs/axiosInstance'
import { API_PATHS } from '../libs/apiPaths'

const pantryItems = async () => {
    try {
        const response = await axiosInstance.get(API_PATHS.PANTRY.PANTRIES);
        return response.data.data.items;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const pantryItemsExpiring = async () => {
    try {
        const response = await axiosInstance.get(API_PATHS.PANTRY.PANTRY_EXPIRING_SOON);
        return response.data.data.items;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const pantryAddItems = async (formData) => {
    try {
        const response = await axiosInstance.post(API_PATHS.PANTRY.PANTRY_ADD, {
            ...formData,
            quantity: parseFloat(formData.quantity),
            expiry_date: formData.expiry_date || null
        });
        return response.data.data.item;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const pantryDeleteItem = async (id) => {
    try {
        const response = await axiosInstance.delete(API_PATHS.PANTRY.PANTRY_DELETE(id) );
        return response.data.data.item;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const pantryService = {
    pantryItems,
    pantryItemsExpiring,
    pantryAddItems,
    pantryDeleteItem
}

export default pantryService;