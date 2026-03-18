// Criar objetivo, limite 1 objetivo por usuário, 
import database from '../config/database';
import Objective from '../@types/Objective';
import { notFoundError, AlreadyExists } from '../errors/AppError';

async function createObjective(userId: string, title: string, description: string): Promise<Objective> {
    const client = await database.connect();
    const validation = await client.query(
        'SELECT * FROM objective WHERE user_id = $1',
        [userId]
    );

    if (validation.rows.length > 0){
        throw AlreadyExists('User already has an objective');
    }
    try{
        const result = await client.query(
            'INSERT INTO objective (user_id, title, description) VALUES ($1, $2, $3) RETURNING id, title, description',
            [userId, title, description]
        );
        return result.rows[0];
    } finally{
        client.release();
    }
}

async function getObjectiveById(objectiveId: string, userId: string): Promise<Objective>{
    const client = await database.connect();
    
    try{
        const result = await client.query(
            'SELECT id, title, description, created_at FROM objective WHERE id = $1 AND user_id = $2',[objectiveId, userId]
        );
        const objective = result.rows[0];
        if (!objective){
            throw notFoundError('Objective not found')
        } return objective;
    } finally{
        client.release();
    }
}

export default {
    createObjective,
    getObjectiveById
}