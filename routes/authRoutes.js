import express from 'express';
import { loginController, regisController, logoutController } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginController);
router.post('/register', regisController);
router.post('/logout', logoutController)

export default router;
