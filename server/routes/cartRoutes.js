import express from 'express';
import { addToCart, clearCart, getCart, removeFromCart, updateCartItem } from '../controllers/cartController.js';
import { protect, userOnly } from '../middleware/auth.js';
const router = express.Router();
router.use(protect);
router.use(userOnly);
router.route('/').get(getCart).post(addToCart).delete(clearCart);
router.route('/:productId').put(updateCartItem).delete(removeFromCart);
export default router;
