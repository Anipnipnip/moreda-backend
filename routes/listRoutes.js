import express from 'express';
import { addToWishlistController, getWishlistController } from '../controllers/listController.js';
import { authenticate } from '../middleware/authMiddleware.js'; // Middleware untuk autentikasi user

const router = express.Router();

// Endpoint untuk menambahkan film ke wishlist
router.post('/add', authenticate, addToWishlistController);

// Endpoint untuk mendapatkan wishlist berdasarkan userId
router.get('/get', authenticate, getWishlistController);

export default router;
