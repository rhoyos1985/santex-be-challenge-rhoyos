import {
	createTeam,
	createTeams,
	findByTeamName,
	findByTLATeam,
	findTeamsByLeagueCode,
} from '../database/models/repositories';
import { IPlayer, ITeam, TeamPlayer } from '../database/models/schemas';
import { InternalServerError, NotFound } from '../errors';
import { ICompetition } from '../database/models/schemas/competition';
import { createPlayersService } from './player';

const createTeamService = async (
	team: any,
	areaName: string,
	competitionRecorded: ICompetition,
): Promise<ITeam> => {
	const teamToSave: ITeam = {
		name: team.name,
		tla: team.tla,
		shortName: team.shortName,
		areaName,
		address: team.address,
		competition: competitionRecorded,
	};

	const teamRecorded: ITeam = await createTeam(teamToSave);

	if (!teamRecorded) throw new InternalServerError('Error saving team');

	const playersToSave: IPlayer[] = team.squad.map((squad: any) => ({
		...squad,
		competition: competitionRecorded,
		team: teamRecorded,
	})) as IPlayer[];

	const playersRecorded: IPlayer[] = await createPlayersService(playersToSave);

	if (!playersRecorded.length) throw new InternalServerError('Error saving players');

	return teamRecorded;
};

const createTeamsService = async (teams: ITeam[]): Promise<ITeam[]> => {
	const teamsRecorded: ITeam[] = await createTeams(teams);

	if (!teamsRecorded.length) throw new InternalServerError('Error saving teams');

	return teamsRecorded;
};

const findTeamByLeagueCodeService = async (code: string): Promise<ITeam[]> => {
	const getTeams: ITeam[] = await findTeamsByLeagueCode(code);
	if (!getTeams) throw new NotFound('Teams not found');

	return getTeams;
};

const findByTLAService = async (tla: string): Promise<ITeam | null> => {
	const getTeam: ITeam | null = await findByTLATeam(tla);
	if (!getTeam) throw new NotFound('Team not found');

	return getTeam;
};

const findTeamByNameService = async (teamName: string): Promise<TeamPlayer> => {
	return findByTeamName(teamName);
};

export {
	findTeamByLeagueCodeService,
	findByTLAService,
	createTeamsService,
	createTeamService,
	findTeamByNameService,
};
