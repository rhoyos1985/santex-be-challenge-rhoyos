import { ICoach, CoachModel } from '../schemas/coach';
import { InternalServerError } from '../../../errors/internalServerError';
import Logger from '../../../logger/winstonLogger';

const createCoach = async ({ name, dateOfBirth, nationality }: ICoach): Promise<ICoach> => {
	return CoachModel.create({ name, dateOfBirth, nationality }).catch((error: unknown) => {
		console.log(error);
		Logger.error(`createCoach function: ${{ error }}`);
		throw new InternalServerError(`Error creating coach`);
	});
};

const findByNameCoach = async (name: string): Promise<ICoach | null> => {
	return CoachModel.findOne({ name }).lean().exec();
};

export { createCoach, findByNameCoach };
