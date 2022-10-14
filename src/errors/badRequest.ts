import { HttpError } from './httpError';

export class BadRequest extends HttpError {
	public name: string = 'Bad Request';
	public statusCode: number = 400;
}
