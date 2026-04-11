import { Request, Response } from 'express';
import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import category from '../utils/categoryPreset';
import objective from '../services/objective';


const router = express.Router();

router.use(express.json());

router.post('/categories', authMiddleware, (req: Request, res: Response) => {
  const { title } = req.body;

  const categories = category.getCategoryPreset(title);

  return res.json({ categories });
});

router.get('/categories/:objectiveId', authMiddleware, async (req, res) => {
    const { objectiveId } = req.params;
    const userId = req.user.id;
    if(!objectiveId){
        return;
    }
    const thisObjective : any = await objective.getObjectiveById(objectiveId, userId);

    if (!thisObjective) {
        return res.status(404).json({ error: 'Objective not found' });
    }

    return res.json({
        categories: thisObjective.categories || []
    });
});

export default router;