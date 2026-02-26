import database from '../config/database';
import Dashboard from '../@types/Dashboard';


async function getDashboard(userId: string): Promise<Dashboard> {
    const client = await database.connect();
    try {
        const result = await client.query(
            `SELECT 
                (SELECT COUNT(*) FROM goals WHERE user_id = $1) AS total_goals,
                (SELECT COUNT(*) FROM goals WHERE user_id = $1 AND completed = true) AS completed_goals,
                (SELECT COUNT(*) FROM goals WHERE user_id = $1 AND completed = false) AS pending_goals`
            ,
            [userId]
        );

        const data = result.rows[0];
        
        const total = Number(data.total_goals);
        const completed = Number(data.completed_goals);
        const pending = Number(data.pending_goals);
        const completionRate = total === 0 ? 0 : Math.round(completed / total * 100);
        return {
            total,
            completed,
            pending,
            completionRate
        };
    } finally {
        client.release();
    }
}

export default {
    getDashboard
};