import express from 'express';
import cors from 'cors';
import env from './env';
import router from './routes';
import Logger from './logger/winstonLogger';
import { connectMongoDB } from './database/config';
import { errorMiddleware } from './middleware/errorMiddleware';
import { checkEnvVariables } from './utility';

const missEnvVAriables: string[] = checkEnvVariables(env);

if (missEnvVAriables.length > 0) {
	Logger.error(`There are env variables empty ${missEnvVAriables}`);
}

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	cors({
		allowedHeaders: ['*', 'Authorization', 'Content-Type', 'mfa'],
		credentials: true,
		methods: ['GET', 'HEAD', 'OPTIONS', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		preflightContinue: true,
	}),
);

app.use(router);
app.use(errorMiddleware);

connectMongoDB();

const PORT: number = +env.PORT || 4000;
app.listen(PORT, () => Logger.info(`Be Challenge RHOYOS Server Listening by Port: ${PORT}`));
