import {
	createCompetition,
	createPlayers,
	findByCompetitionCode,
} from '../database/models/repositories';
import { ICompetition } from '../database/models/schemas/competition';
import { NotAcceptable, InternalServerError, NotFound } from '../errors';
import { ITeam } from '../database/models/schemas/team';
import { createTeamService, createTeamsService } from './team';
import { createCoachService } from './coach';
import { createPlayersService } from './player';
import { IPlayer } from '../database/models/schemas/player';
import { ICoach } from '../database/models/schemas/coach';

const createCompetitionService = async (competitionData: any): Promise<ICompetition> => {
	const { competition, teams } = competitionData;
	const { area } = teams[0];

	const competitionToSave = {
		...competition,
		areaName: area.name,
	} as ICompetition;

	const { name, code, type, areaName, emblem = '' }: ICompetition = competitionToSave;

	const competitionRecord = await findByCompetitionCode(competitionToSave.code);
	if (competitionRecord) throw new NotAcceptable('Competition exists');

	const competitionRecorded: ICompetition = await createCompetition({
		name,
		code,
		type,
		emblem,
		areaName,
	});

	if (!competitionRecorded) throw new InternalServerError('Error saving competition');

	const teamsITeam: ITeam[] = await Promise.all(
		teams.map(async (team: any) => {
			return createTeamService(team, areaName, competitionRecorded);
		}) as ITeam[],
	);

	return competitionRecorded;
};

const findByCompetitionCodeService = async (code: string): Promise<ICompetition | null> => {
	const getCompetition: ICompetition | null = await findByCompetitionCode(code);
	if (!getCompetition) throw new NotFound('Competition not found');

	return getCompetition;
};

export { createCompetitionService, findByCompetitionCodeService };
