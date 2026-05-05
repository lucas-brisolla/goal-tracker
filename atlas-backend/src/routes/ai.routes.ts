import express from 'express';
import { Request, Response } from 'express';
import ai from '../services/AI';
import authMiddleware  from '../middlewares/auth.middleware';


const router = express.Router();

router.post('/goals/suggest', authMiddleware, async (req: Request, res: Response) => {
    const { text }: { text: string } = req.body;
    
    const result = ai.suggestGoal(text);

    console.log("GOT SUGGESTION ", result);

    console.log("body ", req.body);

    return res.json({ improvedText: result.improvedText, feedback: result.feedback });
});

export default router;