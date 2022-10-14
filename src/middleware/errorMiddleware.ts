import Logger from '../logger/winstonLogger';
import { Request, Response, NextFunction } from 'express';
import { messageResponse } from '../utility/appUtility';

export const errorMiddleware = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	Logger.error(error);

	const statusCode = error.statusCode || 600;
	let message = error.message || '<No Error Message>';

	res.status(statusCode).send(messageResponse(statusCode, message, null));
};
