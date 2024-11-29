import {login, signUp} from '../models/authModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const loginController = async(req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    };

    try{
        const result = await login(data);

        if(result.length > 0){
            const row = result[0];
            const passwordMatch = await bcrypt.compare(data.password, row.password);

            if(passwordMatch){
                const payload = {email: row.email};
                const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1 day'});
    
                return res.status(200).json({
                    id: row.id,
                    username: row.username,
                    email: row.email,
                    success: true,
                    token: token
                });
            }else{
                return res.status(400).json({
                    message: 'Invalid password',
                    success: false
                });
            };
        }else{
            return res.status(400).json({
                message: 'Invalid email',
                success: false 
            })
        }
    }catch(error) {
        console.log(error)
        return res.status(500).json({
            message: 'error'
        })
    }
};

const regisController = async(req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    try {
        await signUp(data);

        return res.status(200).json({
            message: 'Pendaftaran berhasil. Silahkan login',
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    };
};

const logoutController = (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (token) {
      invalidatedTokens.add(token); // Tambahkan token ke daftar invalid
      return res.status(200).json({ message: "Logout berhasil" });
    } else {
      return res.status(400).json({ message: "Token tidak ditemukan" });
    }
  };

export { loginController, regisController, logoutController };