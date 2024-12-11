import express from 'express';
import { addToWishlistController, getWishlistController } from '../controllers/listController.js';
import { authenticate } from '../middleware/authMiddleware.js'; // Middleware untuk autentikasi user

const router = express.Router();

router.post('/user/add', authenticate, addToWishlistController);
router.get('/user/get', authenticate, getWishlistController);

export default router;
