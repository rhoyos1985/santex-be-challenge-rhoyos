import { CompetitionModel, ICompetition } from '../schemas';

const createCompetition = async ({
	name,
	code,
	type,
	areaName,
	emblem = '',
}: ICompetition): Promise<ICompetition> => {
	return CompetitionModel.create({ name, code, type, areaName, emblem });
};

const findByCompetitionCode = async (code: string): Promise<ICompetition | null> => {
	return CompetitionModel.findOne({ code }).lean().exec();
};

export { createCompetition, findByCompetitionCode };
