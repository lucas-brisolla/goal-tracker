// Criar objetivo, limite 1 objetivo por usuário, 
import database from '../config/database';
import Objective from '../@types/Objective';
import { notFoundError, AlreadyExists } from '../errors/AppError';
import categoryPreset from '../utils/categoryPreset';

async function createObjective(userId: string, title: string, description: string, categories: string[]): Promise<Objective> {
    const client = await database.connect();
    const validation = await client.query(
        'SELECT * FROM objective WHERE user_id = $1',
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
            'SELECT id, title, description, created_at, categories FROM objective WHERE id = $1 AND user_id = $2', [objectiveId, userId]
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
        

        const result = await database.query('SELECT id, title, description FROM objective WHERE user_id = $1', [userId]
        );
        if (result.rows.length === 0) {
            throw notFoundError('Objective not found')
        } return result.rows[0];
    } finally{
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

export default {
    createObjective,
    getObjectiveById,
    getObjective,
    getObjectiveTitleById
}