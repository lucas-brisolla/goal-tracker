import database from '../config/database';
import Dashboard from '../@types/Dashboard';
import goals from './goals';


async function getDashboard(userId: string): Promise<Dashboard> {
    const client = await database.connect();
    try {
        const goalsResult = await client.query(
            `SELECT 
                COUNT(*) AS total_goals,
                COUNT(*) FILTER (WHERE completed = true) AS completed_goals,
                COUNT(*) FILTER (WHERE completed = false) AS pending_goals
            FROM goals
            WHERE user_id = $1`,
            [userId]
        );

        const userResult = await client.query(
            `SELECT xp, level FROM users WHERE id = $1`,
            [userId]
        );

        if (!goalsResult.rows || goalsResult.rows.length === 0){
            throw new Error("Goals query returned no data");
        }

        if(!userResult.rows || userResult.rows.length === 0){
            throw new Error("User query returned no data")
        }

        const goalsData = goalsResult.rows[0];
        const userData = userResult.rows[0];

        console.log("USER DATA", userData)
        console.log("GOALS DATA: ", goalsData)

        const total = Number(goalsData.total_goals);
        const completed = Number(goalsData.completed_goals);
        const pending = Number(goalsData.pending_goals);
        const completionRate = total === 0 ? 0 : Math.round(completed / total * 100);
        const xp = Number(userData.xp ?? 0);
        const level = Number(userData.level ?? 1);
        const skills = await goals.getSkillsData(userId);
        return {
            total,
            completed,
            pending,
            completionRate,
            skills,
            xp,
            level
        };
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw new Error('Failed to fetch dashboard data');
    } finally {
        client.release();
    };

}

export default {
    getDashboard
};