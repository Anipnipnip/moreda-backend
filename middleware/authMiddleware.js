import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Ambil token dari header Authorization

    if (!token) {
        return res.status(403).json({ message: 'No token provided', success: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;  // Simpan userId dari payload JWT
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token', success: false });
    }
};
