import users from './users';
import JWT from 'jsonwebtoken';

async function comparePassword(plainTextPassword: string, hashedPassword: string) {
    const bcrypt = await import('bcrypt');
    return bcrypt.compare(plainTextPassword, hashedPassword);
}

async function authenticateUser(email: string, password: string) {
    const user = await users.findUserByEmail(email);
    try {
        if (user) {
            const isPasswordValid = await comparePassword(password, user.password_hash);
            if (isPasswordValid) {
                return { id: user.id, email: user.email };
                async function generateToken(user: any) {
                    // Simulated token generation logic
                    return `token-${user.id}`;
                }
            } else {
                throw new Error('Credentials are invalid');
            }
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        throw err;
    }
}

export default authenticateUser;



