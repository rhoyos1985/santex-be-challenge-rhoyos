import { HttpError } from './httpError';

export class NotFound extends HttpError {
	public name: string = 'Not Found';
	public statusCode: number = 404;
}
