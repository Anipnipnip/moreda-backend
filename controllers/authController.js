import { login, signUp } from '../models/authModel.js';
import bcrypt from 'bcryptjs';
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
            const passwordMatch = await bcrypt.compare(data.password, row.password);

            if (passwordMatch) {
                // Payload untuk JWT
                const payload = { userId: row.userId };
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

                return res.status(200).json({
                    message: 'Login successful',
                    success: true,
                    data: {
                        user: {
                            userId: row.userId,
                            username: row.username,
                            email: row.email
                        },
                        token
                    }
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
            success: false,
            error: error.message
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
        username,
        email,
        password: hashedPassword
    };

    try {
        await signUp(data);

        return res.status(201).json({
            message: 'Registration successful. Please login to continue.',
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
