import  database  from '../config/database';
import bcrypt from 'bcrypt';
import { AppError, badRequestError, internalServerError, notFoundError } from '../errors/AppError';
import User from '../@types/user';

async function insertUser(email: string, password: string): Promise<User>{
    const client = await database.connect();
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await client.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
            [email, hashedPassword]
        );
        return result.rows[0];
    } catch (err: any) {
       if (err.code == '23505') {
            throw new AppError('Email already in use', 409);
       } else {
            throw internalServerError('Failed to create user');
       }
    } finally {
        client.release();
    }
  };


async function findUserByEmail(email: string) : Promise<User> {
    const client = await database.connect();
    try {
        const result = await client.query(
            'SELECT id, email, password_hash FROM users WHERE email = $1',
            [email]
        );
        const user = result.rows[0];
        if (!user) {
            throw notFoundError('User not found');
        }
        return user;
    } finally {
        client.release();
    }
}

export default { insertUser, findUserByEmail };