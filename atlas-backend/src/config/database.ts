import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Database connection successful');
        console.log('Current time from DB:', res.rows[0].now);
        console.log('Version running:', res.rows[0]);
    }
});


export default pool;