import  database  from '../config/database';
import bcrypt from 'bcrypt';

async function insertUser(email: string, password: string) {
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
            throw new Error('Email already in use');
       } else {
            throw err;
       }
    } finally {
        client.release();
    }
  };


async function findUserByEmail(email: string) {
    const client = await database.connect();
    try {
        const result = await client.query(
            'SELECT id, email, password_hash FROM users WHERE email = $1',
            [email]
        );
        return result.rows[0];
    } finally {
        client.release();
    }
}

export default { insertUser, findUserByEmail };