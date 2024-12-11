import { getMoviesByTitle, getMoviesByGenre } from '../models/searchModel.js';

export const searchMoviesByTitle = async (req, res) => {
    const { title } = req.body; // Ambil title dari body request
    try {
        const movies = await getMoviesByTitle(title);

        // Bentuk struktur JSON sesuai dengan permintaan
        const result = { 
            judul: movies.map(movie => ({
                genres: movie.genres,
                movieId: movie.movieId,
                title: movie.title
            }))
        };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies by title.', error: error.message });
    }
};

export const searchMoviesByGenre = async (req, res) => {
    const { genres } = req.body; // Ambil genres dari body request
    try {
        const movies = await getMoviesByGenre(genres);

        // Bentuk struktur JSON sesuai dengan permintaan
        const result = { 
            judul: movies.map(movie => ({
                genres: movie.genres,
                movieId: movie.movieId,
                title: movie.title
            }))
        };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies by genre.', error: error.message });
    }
};
