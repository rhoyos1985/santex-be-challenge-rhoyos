import { HttpError } from './httpError';

export class NotAcceptable extends HttpError {
	public name: string = 'Not Acceptable';
	public statusCode: number = 406;
}
