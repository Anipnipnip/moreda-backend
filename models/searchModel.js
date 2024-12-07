import connection from '../config/db.js';

// Model untuk pencarian berdasarkan title
export const getMoviesByTitle = async (title) => {
    try {
        const pool = await connection();
        let query = 'SELECT * FROM movies WHERE title LIKE ?';
        const [rows] = await pool.query(query, [`%${title}%`]);
        return rows;
    } catch (error) {
        console.error("Error fetching movies by title:", error);
        throw error;
    }
};

// Model untuk pencarian berdasarkan genre
export const getMoviesByGenre = async (genres) => {
    try {
        const pool = await connection();
        let query = 'SELECT * FROM movies WHERE genres LIKE ?';
        const [rows] = await pool.query(query, [`%${genres}%`]);
        return rows;
    } catch (error) {
        console.error("Error fetching movies by genre:", error);
        throw error;
    }
};
