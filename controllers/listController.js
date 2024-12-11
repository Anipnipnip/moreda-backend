import { addToWishlist, getWishlist } from '../models/listModel.js';

export const addToWishlistController = async (req, res) => {
    const { movieId } = req.body; // Ambil movieId dari body request
    const userId = req.userId;   // Ambil userId dari JWT token atau session

    try {
        const result = await addToWishlist(userId, movieId);

        if (result) {
            return res.status(200).json({
                message: 'Movie added to wishlist successfully',
                success: true
            });
        } else {
            return res.status(400).json({
                message: 'Movie already exists in wishlist or invalid operation',
                success: false
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

export const getWishlistController = async (req, res) => {
    const userId = req.userId; // Ambil userId dari JWT token atau session

    try {
        const wishlist = await getWishlist(userId);

        if (wishlist.length === 0) {
            return res.status(404).json({
                message: 'Wishlist is empty',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Wishlist fetched successfully',
            success: true,
            data: wishlist
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching wishlist',
            success: false,
            error: error.message
        });
    }
};

