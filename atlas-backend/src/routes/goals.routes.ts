import express from 'express';
import goals from '../services/goals'; 
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/goals', authMiddleware, async (req, res) => {
    console.log('REQ.USER:', (req as any).user);

    const userId = (req as any).user.id;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    try {
        const newGoal = await goals.createGoal(userId, title, description);
        return res.status(201).json(newGoal);
    } catch (err) {
        console.error('Error creating goal:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/goals', authMiddleware, async (req, res) => {
    const userId = (req as any).user.id;

    try {
        const userGoals = await goals.listGoalsByUser(userId);
        return res.json(userGoals);
    } catch (err) {
        console.error('Error fetching goals:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;