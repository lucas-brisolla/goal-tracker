import auth from '../services/auth';
import express  from 'express';
import { Request, Response } from 'express';

const router = express.Router();

router.use(express.json());

router.post('/sessions', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const token = await auth.authenticateUser(email, password);
    res.status(200).json({ message: 'Authentication successful', token });

});

export default router;