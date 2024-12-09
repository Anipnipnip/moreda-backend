// controllers/listsController.js
import { addMovieToList, getMoviesByUser } from '../models/listModel.js';

// Controller untuk menambah atau mengupdate like pada movie di daftar
export const addToList = async (req, res) => {
    const { userId, movieId, like } = req.body;

    if (typeof like !== 'boolean') {
        return res.status(400).json({
            message: 'Like must be a boolean value.',
            success: false
        });
    }

    try {
        const result = await addMovieToList(userId, movieId, like);
        return res.status(200).json({
            message: result.success ? 'Movie added to list.' : 'Movie updated in list.',
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while adding movie to list.',
            error: error.message,
            success: false
        });
    }
};

// Controller untuk mengambil daftar movie berdasarkan userId
export const getUserMovies = async (req, res) => {
    const { userId } = req.params;

    try {
        const movies = await getMoviesByUser(userId);
        return res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching movies for the user.',
            error: error.message,
            success: false
        });
    }
};
