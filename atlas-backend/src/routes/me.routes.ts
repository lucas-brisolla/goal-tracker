import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import { Request, Response } from 'express';

const router = express.Router();

router.get('/me', authMiddleware, async (req: Request, res: Response) => {
   const user = req.user;
   if (!user) {
       return res.status(404).json({ error: 'User not found' });
   } else {
       return res.status(200).json({ user });
   }
});

export default router;