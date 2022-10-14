import { connect, connection, disconnect } from 'mongoose';
import Logger from '../../logger/winstonLogger';
import env from '../../env';

const connectMongoDB = async () => {
	try {
		const connectionString = env.MONGO_CONNECTION_STRING;
		const options = {
			autoIndex: false, // Don't build indexes
			maxPoolSize: 10, // Maintain up to 10 socket connections
			serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
			socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
		};
		Logger.info('Initializing database connection...');

		await connect(connectionString, options);
		Logger.info('Connection to mongo was succesful');
	} catch (error: unknown) {
		Logger.error({ MongoDBInitializationError: error });
	}
};

const disconnectMongoDB = async () => {
	try {
		await disconnect();
		Logger.info('Disconnected to mongo database');
	} catch (error: unknown) {
		Logger.error({ MongoDBDisconnectedError: error });
	}
};

export { connectMongoDB, disconnectMongoDB };
