import express from "express";
import * as shoppingListController from '../controllers/shoppingListController.js'
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.get('/', shoppingListController.getShoppingList);
router.post('/', shoppingListController.addItem);
router.post('/add-to-pantry', shoppingListController.addCheckedToPantry);
router.put('/:id/toggle', shoppingListController.toggleChecked);
router.delete('/:id', shoppingListController.deleteItem);
router.delete('/clear/checked', shoppingListController.clearChecked);

// router.post('/generate', shoppingListController.generateFromMealPlan);
// router.put('/:id', shoppingListController.updateItem);
// router.delete('/clear/all', shoppingListController.clearAll);

export default router;