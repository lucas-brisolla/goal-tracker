import auth from '../services/auth';
import JWT from 'jsonwebtoken';
import express  from 'express';
import JwtPayload  from '../@types/jwt';
import { Request, Response, NextFunction} from 'express';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token missing' });
    }
    try {
        const decodedPayload = JWT.verify(token, process.env.JWT_SECRET || 'super_secret_key') as JwtPayload;
        req.user = { id: decodedPayload.id, email: decodedPayload.email };
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

export default authMiddleware;