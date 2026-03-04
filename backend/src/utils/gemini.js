import { ENV } from '../config/env.js'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
    apiKey: ENV.GEMINI_API_KEY
});

if(!ENV.GEMINI_API_KEY){
    console.log('Warning: GEMINI_API_KEY is not set. AI features will not work')
}

export const generateRecipe = async ({
    ingredients,
    dietaryRestrictions = [],
    cuisineType = 'any',
    servings = 4,
    cookingTime = 'medium'
}) => {
    const dietaryInfo = dietaryRestrictions.length > 0
                        ? `Dietary restrictions: ${dietaryRestrictions.join(', ')}`
                        : 'No dietary restrictions';
    
    const timeGuide = {
        quick: 'under 30 minutes',
        medium: '30-60 minutes',
        long: 'over 60 minutes'
    };

    const prompt = `
    
    Generate a detailed recipe with the following requirements:
                    
    Ingredients available: ${ingredients.join(', ')}
    ${dietaryInfo}
    Cuisine Type: ${cuisineType}
    Servings: ${servings}
    Cooking Time: ${timeGuide[cookingTime] || 'any' }
    
    Please provide a complete recipe in the following JSON format ( return ONLY valid JSON, no markdown):
    
    {
        "recipeId": "uuid-v4",
        "name": "Recipe name",
        "description": "Brief description pf the dish",
        "cuisineType": "${cuisineType}",
        "difficulty": "easy|medium|hard",
        "prepTime": number ( in minutes ),
        "cookTime": number ( in minutes ),
        "servings": ${servings},
        "ingredients": [
            { "name": "ingredient name", "quantity": number, "unit": "unit of measurement" }
        ],
        "instructions": [
            "Step 1 description",
            "Step 2 description"
        ],
        "dietaryTags": ["vegetarian", "gluten-free", "etc.."],
        "nutrition": {
            "calories": number,
            "protein": number ( grams ),
            "carbs": number ( grams ),
            "fats": number ( grams ),
            "fiber": number ( grams )
        },
        "cookingTips": ["Tip 1", "Tip 2"]
    }

    Make sure the recipe is creative, delicious, and uses the provided ingredients effectively.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        })

        const generatedText = response.text.trim();

        // Remove markdown code blocks if present
        let jsonText = generatedText;

        if(jsonText.startsWith('```json')){
            jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
        } else if(jsonText.startsWith('```')){
            jsonText = jsonText.replace(/```\n?/g, '');
        }

        const recipe = JSON.parse(jsonText);

        if( !recipe.recipeId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(recipe.recipeId)) {
            recipe.recipeId = crypto.randomUUID();
        }

        return recipe;
        
    } catch (error) {
        console.error('Gemini API error:', error)
        throw new Error('Failed to generate recipe. Please try again..')
    }
}

export const generatePantrySuggestions = async (
    pantryItems,
    expiringItems = []
) => {
    const ingredients = pantryItems.map(item => item.name).join(', ');
    const expiringText = expiringItems.length > 0
                         ? `\nPriority ingredients (expiring soon): ${expiringItems.join(', ')}`
                         : '';
    
    const prompt = `

        Based on these available ingredients: ${ingredients} ${expiringText}

        Suggest 3 creative recipe ideas that use these ingredients. Return ONLY a JSON of strings ( no markdown ):
        ["Recipe idea 1", "Recipe idea 2", "Recipe idea 3"]

        Each suggestion should be a brief, appetizing description ( 1-2 sentences ).`;

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt
            });

            const generatedText = response.text.trim();

            // Remove markdown code blocks if present
            let jsonText = generatedText;

            if(jsonText.startsWith('```json')){
                jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
            } else if(jsonText.startsWith('```')){
                jsonText = jsonText.replace(/```\n?/g, '');
            }

            const suggestions = JSON.parse(jsonText);

            return suggestions;

        } catch (error) {
            console.error('Gemini API error:', error);
            throw new Error('Failed to generate suggestions');
        }
}

export const generateCookingTips = async (recipe) => {

    const prompt = `
        For this recipe: "${recipe.name}"
        Ingredients: ${recipe.ingredients?.map( item => item.name).join(', ') || 'N/A'}

        Provide 3-5 helpful cooking tips to make this recipe better. Return ONLY a JSON array of strings ( no markdown ):
        ["Tip 1", "Tip 2", "Tip 3"]`;

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt
            });

            const generatedText = response.text.trim();

            // Remove markdown code blocks if present
            let jsonText = generatedText;

            if(jsonText.startsWith('```json')){
                jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
            } else if(jsonText.startsWith('```')){
                jsonText = jsonText.replace(/```\n?/g, '');
            }

            const tips = JSON.parse(jsonText);
            return tips;

        } catch (error) {
            console.error('Gemini API error:', error);
            return ['Cook with love and patience!'];
        }
}

export default {
    generateRecipe,
    generatePantrySuggestions,
    generateCookingTips
}