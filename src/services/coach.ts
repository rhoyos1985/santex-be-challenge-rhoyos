import { ICoach } from '../database/models/schemas/coach';
import { createCoach, findByNameCoach } from '../database/models/repositories';
import { NotAcceptable, InternalServerError, NotFound } from '../errors';

const createCoachService = async ({ name, dateOfBirth, nationality }: ICoach): Promise<ICoach> => {
	const coachRecorded: ICoach = await createCoach({
		name,
		dateOfBirth,
		nationality,
	});
	if (!coachRecorded) throw new InternalServerError('Error saving coach');

	return coachRecorded;
};

const findByNameCoachService = async (name: string): Promise<ICoach | null> => {
	const getCoach: ICoach | null = await findByNameCoach(name);
	if (!getCoach) throw new NotFound('Coach not found');

	return getCoach;
};

export { createCoachService, findByNameCoachService };
