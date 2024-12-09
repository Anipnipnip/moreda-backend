// routes/listsRoutes.js
import express from 'express';
import { addToList, getUserMovies } from '../controllers/listController.js';

const router = express.Router();

// Endpoint untuk menambah atau mengupdate like pada movie
router.post('/add', addToList);

// Endpoint untuk mendapatkan daftar movie berdasarkan userId
router.get('/:userId/list', getUserMovies);

export default router;
