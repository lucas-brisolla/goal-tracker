import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import  database  from './config/database';
import routes from './routes/users.routes';
import sessionRoutes from './routes/sessions.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use('/api', sessionRoutes);

// Test database connection on startup
testConnection();

app.get('/health', (req, res) =>{
    return res.json({status: 'ok', message: 'Atlas API running' });
});

const PORT = process.env.PORT || 3333;

app.listen (PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

async function testConnection() {
    try {
        const client = await database.query('SELECT NOW()');
        console.log('Database connection successful');
        console.log('Current time from DB:', client.rows[0].now);
        console.log('Version running:', client.rows[0]);
    } catch (err) {
        if (err instanceof Error) {
            console.error('Database connection error:', err.stack);
        }
    }
}



