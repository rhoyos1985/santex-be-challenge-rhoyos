import { TeamModel, ITeam, TeamPlayer } from '../schemas';
import { InternalServerError } from '../../../errors/internalServerError';
import Logger from '../../../logger/winstonLogger';
import { IPlayer, PlayerModel } from '../schemas/player';
import { NotFound } from '../../../errors/notFound';

const hideFields = { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 };

const createTeam = async ({
	name,
	tla,
	shortName,
	areaName,
	address,
	competition,
}: ITeam): Promise<ITeam> => {
	return TeamModel.create({ name, tla, shortName, areaName, address, competition }).catch(
		(error: unknown) => {
			Logger.error(`createTeam function: ${{ error }}`);
			throw new InternalServerError(`Error creating team`);
		},
	);
};

const createTeams = async (teams: ITeam[]): Promise<ITeam[]> => {
	return TeamModel.insertMany(teams).catch((error: unknown) => {
		Logger.error(`createTeams function: ${{ error }}`);
		throw new InternalServerError(`Error creating multiples team`);
	});
};

const findTeamsByLeagueCode = async (code: string): Promise<ITeam[]> => {
	return TeamModel.find({ code }, hideFields)
		.lean()
		.populate({ path: 'competition', select: hideFields })
		.exec();
};

const findByTeamName = async (teamName: string): Promise<TeamPlayer> => {
	const team = await TeamModel.findOne({ name: teamName.toString().trim() }).lean().exec();

	const players: IPlayer[] = await PlayerModel.find(
		{ team: team?._id },
		{ ...hideFields, competition: 0, team: 0 },
	)
		.lean()
		.exec();

	if (!team) throw new NotFound('Team not found');

	const teamPlayers: TeamPlayer = {
		name: team.name || '',
		tla: team.tla || '',
		shortName: team.shortName || '',
		address: team.address || '',
		areaName: team.areaName || '',
		players,
	};

	return teamPlayers;
};

const findByTLATeam = async (tla: string): Promise<ITeam | null> => {
	return TeamModel.findOne({ tla }).lean().populate('coach').exec();
};

export { createTeam, createTeams, findTeamsByLeagueCode, findByTLATeam, findByTeamName };
