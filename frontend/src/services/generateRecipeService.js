import axiosInstance from '../libs/axiosInstance'
import { API_PATHS } from '../libs/apiPaths'

const getUserPreferences = async () => {
    try {
        const response = await axiosInstance.get(API_PATHS.USER.GET_USER_PREFERENCES);
        return response.data.data.preferences;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const generateRecipe = async (data) => {
    try {
        const response = await axiosInstance.post(API_PATHS.RECIPES.GENERATE_RECIPE, data);
        return response.data.data.recipe;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const saveRecipe = async (data) => {
    try {
        const response = await axiosInstance.post(API_PATHS.RECIPES.SAVE_RECIPE, data);
        return response.data.data.recipe;
    } catch (error) {
      throw error.response?.data || { message: 'An unknown error occur' }  
    }
}

const generateRecipeService = {
    getUserPreferences,
    generateRecipe,
    saveRecipe
}

export default generateRecipeService;