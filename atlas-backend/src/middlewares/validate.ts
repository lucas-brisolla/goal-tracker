import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';
import { badRequestError } from '../errors/AppError';

export function validate<T extends ZodTypeAny>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Invalid request data';
      return next(badRequestError(message));
    }
    req.body = result.data;
    next();
  };
}
