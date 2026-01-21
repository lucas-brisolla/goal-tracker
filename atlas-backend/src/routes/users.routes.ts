import insertUser from '../users';

const express = require('express');
const router = express.Router();


router.use(express.json());

router.post('/users', async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await insertUser(email, password);
        res.status(201).json({message: 'User created successfully', user: newUser});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;