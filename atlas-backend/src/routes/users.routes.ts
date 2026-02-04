import users from '../services/users';
import express  from 'express';

const router = express.Router();

router.use(express.json());

router.post('/users', async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
        const newUser = await users.insertUser(email, password);
        res.status(201).json({message: 'User created successfully', user: newUser});
    } catch (error) {
        throw error;
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;