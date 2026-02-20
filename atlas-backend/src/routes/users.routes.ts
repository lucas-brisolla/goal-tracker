import users from '../services/users';
import express  from 'express';
import { Request, Response } from 'express';

const router = express.Router();

router.use(express.json());

router.post('/users', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const newUser = await users.insertUser(email, password);
    res.status(201).json({message: 'User created successfully', user: newUser});

});

export default router;