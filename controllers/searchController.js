import { getMoviesByTitle, getMoviesByGenre } from '../models/searchModel.js';

// Controller untuk pencarian berdasarkan title
export const searchMoviesByTitle = async (req, res) => {
    const { title } = req.body;  // Ambil title dari body request
    try {
        const movies = await getMoviesByTitle(title);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies by title.', error: error.message });
    }
};

// Controller untuk pencarian berdasarkan genre
export const searchMoviesByGenre = async (req, res) => {
    const { genres } = req.body;  // Ambil genres dari body request
    try {
        const movies = await getMoviesByGenre(genres);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies by genre.', error: error.message });
    }
};
