import express from 'express';
import { createProduct, createReview, deleteProduct, getProductById, getProducts, getSimilarProducts, updateProduct } from '../controllers/productController.js';
import { adminOnly, protect } from '../middleware/auth.js';
const router = express.Router();
router.route('/').get(getProducts).post(protect, adminOnly, createProduct);
router.get('/:id/similar', getSimilarProducts);
router.route('/:id').get(getProductById).put(protect, adminOnly, updateProduct).delete(protect, adminOnly, deleteProduct);
router.post('/:id/reviews', protect, createReview);
export default router;
