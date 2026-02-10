import auth from '../services/auth';
import JWT from 'jsonwebtoken';
import express  from 'express';

async function authMiddleware(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token missing' });
    }
    try {
        const decoded: any = JWT.verify(token, process.env.JWT_SECRET || 'super_secret_key');
        req.user = { id: decoded.id, email: decoded.email };
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

export default authMiddleware;