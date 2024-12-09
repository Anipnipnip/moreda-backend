// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/authRoutes.js';
import searchRouter from './routes/searchRoutes.js';
import listsRouter from './routes/listRoutes.js';  // Import lists router
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: '*'
}));

app.use('/auth', authRouter);
app.use('/movies', searchRouter);
app.use('/wishlist', listsRouter);  // Tambahkan routing lists

app.listen(port, () => {
    console.log('Server running on port', port);
});
