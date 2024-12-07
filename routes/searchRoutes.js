import express from 'express';
import { searchMoviesByTitle, searchMoviesByGenre } from '../controllers/searchController.js';

const router = express.Router();

// Endpoint untuk pencarian berdasarkan title
router.post('/search/title', searchMoviesByTitle);

// Endpoint untuk pencarian berdasarkan genre
router.post('/search/genre', searchMoviesByGenre);

export default router;
