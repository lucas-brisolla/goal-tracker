import objective from '../services/objective';
import { CreateObjectiveDTO } from '../@types/dto';
import { Request, Response } from 'express';
import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.use (express.json())

router.post('/objective', authMiddleware, async (req: Request, res: Response) =>{
    const userId = req.user.id;
    const {title, description} : CreateObjectiveDTO = req.body

    const newObjective = await objective.createObjective(userId, title, description);
    return res.status(201).json(newObjective);
});

router.get('/objective:id', authMiddleware, async (req: Request, res: Response) =>{
    const userId = req.user.id;
    const objectiveId = req.params.id!

    const get_objective = await objective.getObjectiveById(objectiveId, userId);
    return res.json(get_objective);
});

export default router;