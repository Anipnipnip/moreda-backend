import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = async() => {
    try {
        const pool = createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT
        });

        return pool;
        
    } catch (error) {
        console.log(error);
    };
};

export default connection;