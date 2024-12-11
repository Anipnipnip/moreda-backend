import express from 'express';
import { searchMoviesByTitle, searchMoviesByGenre } from '../controllers/searchController.js';

const router = express.Router();

router.post('/search/title', searchMoviesByTitle);
router.post('/search/genre', searchMoviesByGenre);

export default router;
