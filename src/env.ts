require('dotenv').config();

export default {
	PORT: process.env.PORT ?? '4000',
	MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING ?? '',
	API_FOOTBALL_DATA_URL: process.env.API_FOOTBALL_DATA_URL ?? '',
	AUTH_API_TOKEN: process.env.AUTH_API_TOKEN ?? '',
	CODE_FOOTBALL_VALIDS: process.env.CODE_FOOTBALL_VALIDS ?? '',
};
