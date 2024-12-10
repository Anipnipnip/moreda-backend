// models/listsModel.js
import connection from "../config/db.js";

// Fungsi untuk menambahkan data ke tabel lists (liked/unliked movie)
export const addMovieToList = async (userId, movieId, liked) => {
    try {
        const db = await connection();
        const query = `
            INSERT INTO lists (userId, movieId, \`liked\`)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE \`liked\` = ?;
        `;
        await db.query(query, [userId, movieId, liked, liked]);
        return { success: true };
    } catch (error) {
        console.error('Error adding movie to list:', error);
        throw error;
    }
};

// Fungsi untuk mengambil daftar movie berdasarkan userId
export const getMoviesByUser = async (userId) => {
    try {
        const db = await connection();
        const query = `
            SELECT movies.*, lists.\`liked\`, lists.time 
            FROM lists 
            JOIN movies ON lists.movieId = movies.movieId 
            WHERE lists.userId = ?;
        `;
        const [movies] = await db.query(query, [userId]);
        return movies;
    } catch (error) {
        console.error('Error fetching movies for user:', error);
        throw error;
    }
};
