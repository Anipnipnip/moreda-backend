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
                const payload = { email: row.email };
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1 day' });

                return res.status(200).json({
                    id: row.id,
                    username: row.username,
                    email: row.email,
                    success: true,
                    token: token
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
            message: 'error'
        });
    }
};

const regisController = async (req, res) => {
    const { username, email, password } = req.body;

    // Validasi input
    if (!username) {
        return res.status(400).json({
            message: 'Username is required',
            success: false
        });
    }

    if (!email) {
        return res.status(400).json({
            message: 'Email is required',
            success: false
        });
    }

    if (!password) {
        return res.status(400).json({
            message: 'Password is required',
            success: false
        });
    }

    // Hash password dengan bcryptjs (menggunakan async/await)
    const hashedPassword = await bcrypt.hash(password, 10); // Menggunakan bcryptjs

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
        return res.status(500).json({
            message: 'An error occurred',
            success: false,
            error: error.message
        });
    }
};

export { loginController, regisController };
