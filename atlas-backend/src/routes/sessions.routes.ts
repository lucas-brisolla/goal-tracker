import auth from '../services/auth';
import express  from 'express';

const router = express.Router();

router.use(express.json());

router.post('/sessions', async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
        const token = await auth.authenticateUser(email, password);
        res.status(200).json({ message: 'Authentication successful', token });
    } catch (error) {
        throw error;
        res.status(401).json({ error: 'Unauthorized access' });
    } 
});

export default router;