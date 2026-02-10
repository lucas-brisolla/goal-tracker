import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/me', authMiddleware, async (req: any, res: any) => {
   const user = req.user;
   if (!user) {
       return res.status(404).json({ error: 'User not found' });
   } else {
       return res.status(200).json({ user });
   }
});

export default router;