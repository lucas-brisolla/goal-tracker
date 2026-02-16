import database from '../config/database';

async function createGoal(userId: string, title: string, description: string) {
    const client = await database.connect();
    try {
        const result = await client.query(
            'INSERT INTO goals (user_id, title, description) VALUES ($1, $2, $3) RETURNING id, title, description',
            [userId, title, description]
        );
        return result.rows[0];
    } finally {
        client.release();
    }
}

async function listGoalsByUser(userId: string) {
    const client = await database.connect();
    try {
        const result = await client.query(
            'SELECT id, title, description FROM goals WHERE user_id = $1',
            [userId]
        );
        return result.rows;
    } finally {
        client.release();
    }
}

export default { 
    createGoal, 
    listGoalsByUser 
};