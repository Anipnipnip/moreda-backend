import { login, signUp } from '../models/authModel.js';
import bcrypt from 'bcryptjs';  // Ganti bcrypt dengan bcryptjs
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const loginController = async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    };

    try {
        const result = await login(data);

        if (result.length > 0) {
            const row = result[0];
            const passwordMatch = await bcrypt.compare(data.password, row.password); // Menggunakan bcryptjs

            if (passwordMatch) {
                // Payload untuk JWT
                const payload = { userId: row.userId };  // Kirim `id` sebagai `userId` dalam JWT payload
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

                return res.status(200).json({
                    userId: row.userId,  // Kirim `id` dari database sebagai `userId`
                    username: row.username,
                    email: row.email,
                    success: true,
                    token: token  // Kirim token yang sudah di-generate
                });
            } else {
                return res.status(400).json({
                    message: 'Invalid password',
                    success: false
                });
            }
        } else {
            return res.status(400).json({
                message: 'Invalid email',
                success: false
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'An error occurred while logging in',
            success: false
        });
    }
};

const regisController = async (req, res) => {
    const { username, email, password } = req.body;

    // Validasi input
    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'Username, Email, and Password are required',
            success: false
        });
    }

    // Hash password dengan bcryptjs (menggunakan async/await)
    const hashedPassword = await bcrypt.hash(password, 10); // Menggunakan bcryptjs untuk hashing password

    const data = {
        username,
        email,
        password: hashedPassword
    };

    try {
        await signUp(data);

        return res.status(200).json({
            message: 'Pendaftaran berhasil. Silahkan login',
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'An error occurred during registration',
            success: false,
            error: error.message
        });
    }
};

export { loginController, regisController };
