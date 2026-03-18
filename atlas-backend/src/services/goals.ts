import database from '../config/database';
import Goal from '../@types/goal';
import objective from './objective';
import { notFoundError } from '../errors/AppError';

async function createGoal(userId: string, objectiveId: string,  title: string, description: string): Promise<Goal> {
    const client = await database.connect();
    const objective = await client.query(
        'SELECT id FROM objective WHERE id = $1 AND user_id = $2',[objectiveId, userId]
    );

    if (objective.rows.length === 0){
        throw notFoundError('Objective not found');
    }
    try {
        const result = await client.query(
            'INSERT INTO goals (user_id, title, description) VALUES ($1, $2, $3, $4) RETURNING id, title, description',
            [userId, title, description]
        );
        return result.rows[0];
    } finally {
        client.release();
    }
}

async function listGoalsByUser(userId: string): Promise<Goal[]> {
    const client = await database.connect();
    try {
        const result = await client.query(
            'SELECT id, title, description, completed, completed_at FROM goals WHERE user_id = $1',
            [userId]
        );
        return result.rows;
    } finally {
        client.release();
    }
}

async function getGoalById(goalId: string, userId: string): Promise<Goal> {
    const client = await database.connect();
    try {
        const result = await client.query(
            'SELECT id, title, description, completed, completed_at FROM goals WHERE id = $1 AND user_id = $2',
            [goalId, userId]
        );
        const goal = result.rows[0];
        if (!goal) {
            throw notFoundError('Goal not found');
        }
        return goal;
    } finally {
        client.release();
    }
}

async function updateGoal(goalId: string, userId: string, title: string, description: string): Promise<Goal> {
    const client = await database.connect();
    try {
        const result = await client.query('UPDATE goals SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND user_id = $4 RETURNING id, title, description', [title, description, goalId, userId]);
        const updatedGoal = result.rows[0];
        if (!updatedGoal) {
            throw notFoundError('Goal not found');
        }
        return updatedGoal;
    } finally {
        client.release();
    }
}

async function deleteGoal(goalId: string, userId: string): Promise<void> {
    const client = await database.connect();
    try {
        const result = await client.query('DELETE FROM goals WHERE id = $1 AND user_id = $2 RETURNING id', [goalId, userId]);
        if (result.rowCount === 0) {
            throw notFoundError('Goal not found');
        }
    } finally {
        client.release();
    }
}

async function completeGoal(goalId: string, userId: string): Promise<Goal> {
    const client = await database.connect();
    try {
        const result = await client.query(
            'UPDATE goals SET completed = TRUE, completed_at = CURRENT_TIMESTAMP WHERE id = $1 AND user_id = $2 RETURNING id, title, description, completed AS completed, completed_at',
            [goalId, userId]
        );
        const goal = result.rows[0];
        if (!goal) {
            throw notFoundError('Goal not found');
        }
        return goal;
    } finally {
        client.release();
    }
}

async function uncompleteGoal(goalId: string, userId: string): Promise<Goal> {
    const client = await database.connect();
    try {
        const result = await client.query(
            'UPDATE goals SET completed = FALSE, completed_at = NULL WHERE id = $1 AND user_id = $2 RETURNING id, title, description, completed AS completed, completed_at',
            [goalId, userId]
        );
        const goal = result.rows[0];
        if (!goal) {
            throw notFoundError('Goal not found');
        }
        return goal;
    } finally {
        client.release();
    }
}


export default { 
    createGoal, 
    listGoalsByUser,
    getGoalById,
    updateGoal,
    deleteGoal,
    completeGoal,
    uncompleteGoal
};