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

async function getGoalById(goalId: string, userId: string) {
    const client = await database.connect();
    try {
        const result = await client.query(
            'SELECT id, title, description FROM goals WHERE id = $1 AND user_id = $2',
            [goalId, userId]
        );
        return result.rows[0];
    } finally {
        client.release();
    }
}

async function updateGoal(goalId: string, userId: string, title: string, description: string) {
    const client = await database.connect();
    try {
        const result = await client.query('UPDATE goals SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND user_id = $4 RETURNING id, title, description', [title, description, goalId, userId]);
        return result.rows[0];
    } finally {
        client.release();
    }
}

async function deleteGoal(goalId: string, userId: string){
    const client = await database.connect();
    try {
        await client.query('DELETE FROM goals WHERE id = $1 AND user_id = $2 RETURNING id', [goalId, userId]);
    } finally {
        client.release();
    }
}


export default { 
    createGoal, 
    listGoalsByUser,
    getGoalById,
    updateGoal,
    deleteGoal
};