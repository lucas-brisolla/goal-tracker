import objective from '../services/objective';
import { CreateObjectiveDTO } from '../@types/dto';
import { Request, Response } from 'express';
import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import auth from '../services/auth';

const router = express.Router();

router.use (express.json())

router.post('/objective', authMiddleware, async (req: Request, res: Response) =>{
    const userId = req.user.id;
    const {title, description, categories} : CreateObjectiveDTO = req.body

    const newObjective = await objective.createObjective(userId, title, description, categories);
    return res.status(201).json(newObjective);
});

router.get('/objective', authMiddleware, async (req: Request, res: Response) => {
    const userId = req.user.id;
    const get_objective = await objective.getObjective(userId);

    return res.json(get_objective);
    }
)

router.get('/objective:id', authMiddleware, async (req: Request, res: Response) =>{
    const userId = req.user.id;
    const objectiveId = req.params.id!

    const get_objective = await objective.getObjectiveById(objectiveId, userId);
    return res.json(get_objective);
});

router.get('/objective/:id/title', authMiddleware, async (req: Request, res: Response) => {
    const userId = req.user.id;
    const objectiveId = req.params.id!;

    const title = await objective.getObjectiveTitleById(objectiveId, userId);
    return res.json({ title });
}); 

router.put('/objective/:id/complete', authMiddleware, async (req: Request, res: Response) =>{
    const userId = req.user.id;
    const objectiveId = req.params.id!;
    const { validation } = req.body;

    console.log(validation);
    console.log(typeof validation);

    if (!validation || validation.length < 30){
        return res.status(400).json('Error. The validation must be at least 30 characteres long')
    }

    const objectiveCompleted = await objective.completeObjective(userId, objectiveId, validation);
    return res.json(objectiveCompleted);
})

export default router;