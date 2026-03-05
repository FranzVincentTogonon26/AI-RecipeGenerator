import axiosInstance from '../libs/axiosInstance'
import { API_PATHS } from '../libs/apiPaths'

const myRecipeList = async () => {
    try {
        const response = await axiosInstance.get(API_PATHS.RECIPES.RECIPES);
        return response.data.data.recipes;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const deleteRecipe = async (id) => {
    try {
        const response = await axiosInstance.delete(API_PATHS.RECIPES.RECIPE_DELETE(id));
        return response.data.data.recipe;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const getRecipeDetails = async (id) => {
    try {
        const response = await axiosInstance.get(API_PATHS.RECIPES.RECIPE_DETAILS(id));
        return response.data.data.recipe;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const myRecipeService = {
    myRecipeList,
    deleteRecipe,
    getRecipeDetails
}

export default myRecipeService;