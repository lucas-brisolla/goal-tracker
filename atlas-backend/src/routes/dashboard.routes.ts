import {Request, Response} from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import dashboardService from '../services/dashboard';
import { AppError, internalServerError } from '../errors/AppError';

const router = require('express').Router();

router.get('/dashboard', authMiddleware, async (req: Request, res: Response) => {
    const userId = req.user.id;

    try {
        const dashboard = await dashboardService.getDashboard(userId);
        return res.json(dashboard);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw internalServerError('Failed to fetch dashboard data');
    }
});

export default router;