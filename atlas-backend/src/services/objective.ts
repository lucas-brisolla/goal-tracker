// Criar objetivo, limite 1 objetivo por usuário, 
import database from '../config/database';
import Objective from '../@types/Objective';
import goals from './goals';
import { notFoundError, AlreadyExists, internalServerError, badRequestError } from '../errors/AppError';
import categoryPreset from '../utils/categoryPreset';

async function createObjective(userId: string, title: string, description: string, categories: string[]): Promise<Objective> {
    const client = await database.connect();
    const validation = await client.query(
        'SELECT * FROM objective WHERE user_id = $1 and completed= FALSE LIMIT 1',
        [userId]
    );

    if (validation.rows.length > 0) {
        throw AlreadyExists('User already has an objective');
    }
    try {
        const result = await client.query(
            'INSERT INTO objective (user_id, title, description, categories) VALUES ($1, $2, $3, $4) RETURNING id, title, description',
            [userId, title, description, categories.length > 0 ? categories : categoryPreset.getCategoryPreset(title)]
        );
        return result.rows[0];

    } catch (error: any) {
        if (error.code === '23505') {
            throw AlreadyExists('User already has an objective');
        }
        throw error;
    } finally {
        client.release();
    }
}

async function getObjectiveById(objectiveId: string, userId: string): Promise<Objective> {
    const client = await database.connect();

    try {
        const result = await client.query(
            'SELECT id, title, description, created_at, categories, completed, completed_at, validation FROM objective WHERE id = $1 AND user_id = $2', [objectiveId, userId]
        );
        const objective = result.rows[0];
        if (!objective) {
            throw notFoundError('Objective not found')
        } return objective;
    } finally {
        client.release();
    }
}

async function getObjective(userId: string): Promise<Objective> {
    const client = await database.connect();

    try {


        const result = await database.query('SELECT id, title, description, created_at, categories, completed, completed_at, validation FROM objective WHERE user_id = $1', [userId]
        );
        if (result.rows.length === 0) {
            throw notFoundError('Objective not found')
        } return result.rows[0];
    } finally {
        client.release();
    }
}

async function getObjectiveTitleById(objectiveId: string, userId: string): Promise<string> {
    const client = await database.connect();

    try {
        const result = await client.query(
            'SELECT title FROM objective WHERE id = $1 AND user_id = $2', [objectiveId, userId]
        );
        const objective = result.rows[0];
        if (!objective) {
            throw notFoundError('Objective not found')
        } return objective.title;
    } finally {
        client.release();
    }
}

async function completeObjective(objectiveId: string, userId: string, validation: string) {
    const client = await database.connect();
    const listedGoals = await goals.listGoalsByUser(userId);
    const totalGoals = listedGoals.length;
    const CompletedGoals = listedGoals.filter(goal => goal.completed).length;




    if (totalGoals != CompletedGoals) {
        throw badRequestError("Complete all goals before finishing the objective.");
    }

    try {
        const result = await client.query(
            'UPDATE objective SET completed = TRUE, completed_at = CURRENT_TIMESTAMP, validation = $3 WHERE id = $1 AND user_id = $2 RETURNING id, title, description, created_at, categories, completed, completed_at, validation', [objectiveId, userId, validation]
        );
        return result;
    } catch {
        throw internalServerError("Something went wrong...");
    } finally {
        client.release();
    }
}

export default {
    createObjective,
    getObjectiveById,
    getObjective,
    getObjectiveTitleById,
    completeObjective
}