import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidaitonError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('Invalid request');

        Object.setPrototypeOf(this, RequestValidaitonError.prototype);
    }

    serializeErrors() {
        return this.errors.map(e => {
            return { message: e.msg, field: e.param }
        });
    }
}