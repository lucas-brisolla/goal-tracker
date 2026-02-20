export class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export function notFoundError(entity: string){
    return new AppError(`${entity} not found`, 404);
}

export function unauthorizedError(message: string = 'Unauthorized') {
    return new AppError(message, 401);
}

export function badRequestError(message: string = 'Bad Request') {
    return new AppError(message, 400);
}

export function internalServerError(message: string = 'Internal Server Error') {
    return new AppError(message, 500);
}
