import { AppError } from '../errors/AppError';
import users from './users';
import JWT from 'jsonwebtoken';


async function comparePassword(plainTextPassword: string, hashedPassword: string) {
    const bcrypt = await import('bcrypt');
    return bcrypt.compare(plainTextPassword, hashedPassword);
}

async function authenticateUser(email: string, password: string) {
    const user = await users.findUserByEmail(email);
    if (!user) {
        throw new AppError('User not found', 404);
    }
    const passwordMatch = await comparePassword(password, user.password_hash);
    if (!passwordMatch) {
        throw new AppError('Invalid password', 401);
    }
    try {
        const token = JWT.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
        return token;
    } catch (err) {
        throw new AppError('Failed to generate token', 500);        
    }
}

export default {authenticateUser};



