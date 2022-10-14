import { MessageResponse } from '../interfaces/messageResponse';

const messageResponse = (statusCode: number, message: string, data: any): MessageResponse => {
	return {
		statusCode,
		message,
		data,
	};
};

const objectIsEmpty = (obj: any): boolean => {
	if (!obj) return true;
	return !Object.entries(obj).length;
};

const checkEnvVariables = (obj: any): string[] => {
	const objKeys = Object.keys(obj);
	const missEnvVariables: string[] = [];

	objKeys.forEach((key) => {
		const envVariableValue = obj[key];
		if (!envVariableValue) missEnvVariables.push(key);
	});

	return missEnvVariables;
};

const validCodesFootballAccount = (code: string, arrCodes: string[]): boolean => {
	if (!arrCodes.length) return false;

	return arrCodes.includes(code);
};

export { messageResponse, objectIsEmpty, checkEnvVariables, validCodesFootballAccount };
