import users from './users';
import JWT from 'jsonwebtoken';

async function comparePassword(plainTextPassword: string, hashedPassword: string) {
    const bcrypt = await import('bcrypt');
    return bcrypt.compare(plainTextPassword, hashedPassword);
}

async function authenticateUser(email: string, password: string) {
    const user = await users.findUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    const passwordMatch = await comparePassword(password, user.password_hash);
    if (!passwordMatch) {
        throw new Error('Invalid password');
    }
    try {
        const token = JWT.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
        return token;
    } catch (err) {
        throw new Error('Failed to generate token');        
    }
}

export default {authenticateUser};



