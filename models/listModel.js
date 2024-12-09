// models/listsModel.js
import connection from "../config/db.js";

// Fungsi untuk menambahkan data ke tabel lists (like/unlike movie)
export const addMovieToList = async (userId, movieId, like) => {
    try {
        const db = await connection();
        const query = `
            INSERT INTO lists (userId, movieId, \`like\`)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE \`like\` = ?;
        `;
        await db.query(query, [userId, movieId, like, like]);
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
            SELECT movies.*, lists.\`like\`, lists.time 
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
