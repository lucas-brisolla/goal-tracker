import express from 'express';
import { Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import  { validate } from '../middlewares/validate';
import database from '../config/database';

const router = express.Router();

router.get('/achievements', authMiddleware, async (req, res) => {
    console.log("🔥 /achievements chamado");

    try {
        const userId = req.user.id;

        const result = await database.query(`
            SELECT a.id, a.name, a.description, a.icon
            FROM achievement a
            JOIN user_achievement ua ON ua.achievement_id = a.id
            WHERE ua.user_id = $1
        `, [userId]);

        console.log("RESULT:", result.rows);

        return res.json(result.rows);

    } catch (error) {
        console.error("💥 ERRO REAL:", error);
        return res.status(500).json({ error: "fail" });
    }
});

export default router;