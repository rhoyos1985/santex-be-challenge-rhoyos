import { HttpError } from './httpError';

export class InternalServerError extends HttpError {
	public name: string = 'Internal Server Error';
	public statusCode: number = 500;
}
