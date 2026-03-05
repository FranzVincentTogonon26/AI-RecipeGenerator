import axiosInstance from '../libs/axiosInstance'
import { API_PATHS } from '../libs/apiPaths'

const userPreferences = async () => {
    try {
        const response = await axiosInstance.get(API_PATHS.USER.USER_PREFERENCES);
        return response.data.data.preferences;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const preferencesUpdate = async (preferences) => {
    try {
        const response = await axiosInstance.put(API_PATHS.USER.UPDATE_USER_PREFERENCES, preferences);
        return response.data.data.preferences;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occur' }
    }
}

const settingService = {
    userPreferences,
    preferencesUpdate
}

export default settingService;