export abstract class HttpError extends Error {
	public abstract name: string;
	public abstract statusCode: number;

	constructor(message: string) {
		super(message);
	}
}
