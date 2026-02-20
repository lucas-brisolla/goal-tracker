import express from 'express';
import goals from '../services/goals'; 
import authMiddleware from '../middlewares/auth.middleware';
import { Request, Response } from 'express';
import {GoalDTO, CreateGoalDTO, UpdateGoalDTO} from '../@types/dto';
import { AppError } from '../errors/AppError';

const router = express.Router();

router.post('/goals', authMiddleware, async (req: Request, res: Response) => {
    console.log('REQ.USER:', req.user);

    const userId = req.user.id;
    const { title, description }: CreateGoalDTO = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    const newGoal = await goals.createGoal(userId, title, description);
    return res.status(201).json(newGoal);
   
});

router.get('/goals', authMiddleware, async (req: Request, res: Response) => {
    const userId = req.user.id;

    const userGoals = await goals.listGoalsByUser(userId);
    return res.json(userGoals);
});

router.get('/goals/:id', authMiddleware, async (req: Request, res: Response) => {
    const userId = req.user.id;
    const goalId = req.params.id!;

    const goal = await goals.getGoalById(goalId, userId);
    return res.json(goal);
    
});

router.put('/goals/:id', authMiddleware, async (req: Request, res: Response) => {
    const userId = req.user.id;
    const goalId = req.params.id!;
    const { title, description }: UpdateGoalDTO = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    const updatedGoal = await goals.updateGoal(goalId, userId, title, description);
    return res.json(updatedGoal);
});

router.delete('/goals/:id', authMiddleware, async (req: Request, res: Response) => {
    const userId = req.user.id;
    const goalId = req.params.id!;
    
    await goals.deleteGoal(goalId, userId);
    return res.status(204).send();
});

export default router;