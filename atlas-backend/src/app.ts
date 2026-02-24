import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import  database  from './config/database';
import routes from './routes/users.routes';
import sessionRoutes from './routes/sessions.routes';
import authMiddleware from './middlewares/auth.middleware';
import meRoutes from './routes/me.routes';
import goalsRoutes from './routes/goals.routes';
import { AppError } from './errors/AppError';
import { Request, Response, NextFunction } from 'express';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', sessionRoutes);
app.use('/api', routes);
// Protected routes
app.use('/api', authMiddleware, meRoutes);
app.use('/api', authMiddleware, goalsRoutes);

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


app.use ((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
   if (err instanceof Error) {
    return res.status(500).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
});
