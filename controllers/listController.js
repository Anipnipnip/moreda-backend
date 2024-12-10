import { addToWishlist, getWishlist } from '../models/listModel.js';

// Controller untuk menambahkan film ke wishlist
export const addToWishlistController = async (req, res) => {
    const { movieId } = req.body;
    const userId = req.userId;  // Ambil userId dari JWT token atau session

    try {
        const result = await addToWishlist(userId, movieId);
        if (result) {
            return res.status(200).json({
                message: 'Movie added to wishlist successfully',
                success: true
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Error adding movie to wishlist',
            success: false,
            error: error.message
        });
    }
};

// Controller untuk mendapatkan wishlist berdasarkan userId
export const getWishlistController = async (req, res) => {
    const userId = req.userId;  // Ambil userId dari JWT token atau session

    try {
        const wishlist = await getWishlist(userId);
        return res.status(200).json(wishlist);
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching wishlist',
            success: false,
            error: error.message
        });
    }
};
