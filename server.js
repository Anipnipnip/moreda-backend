import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/authRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
<<<<<<< HEAD
const port = process.env.PORT;
=======
const port = 8080;
>>>>>>> 4d131c926c15c74e0613748703011bf8be7a423c

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: '*'
}));

app.use('/auth', authRouter);

app.listen(port, () => {
<<<<<<< HEAD
    console.log('server running on port ', port);
=======
    console.log(`server running`);
>>>>>>> 4d131c926c15c74e0613748703011bf8be7a423c
})