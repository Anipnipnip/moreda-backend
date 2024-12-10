import connection from "../config/db.js";

// Menambahkan film ke wishlist
export const addToWishlist = async (userId, movieId) => {
    try {
        const pool = await connection();
        const query = 'INSERT INTO lists (userId, movieId, liked, time) VALUES (?, ?, true, NOW())';
        await pool.query(query, [userId, movieId]);
        return true;
    } catch (error) {
        console.error("Error adding movie to wishlist:", error);
        throw error;
    }
};

// Mendapatkan wishlist berdasarkan userId
export const getWishlist = async (userId) => {
    try {
        const pool = await connection();
        const query = 'SELECT m.movieId, m.title, m.genres FROM movies m JOIN lists l ON m.movieId = l.movieId WHERE l.userId = ? AND l.liked = true';
        const [rows] = await pool.query(query, [userId]);
        return rows;
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        throw error;
    }
};
