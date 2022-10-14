import {
	createPlayer,
	createPlayers,
	findByNamePlayer,
	findAllCompetitionPlayers,
	findPlayersByTeam,
} from '../database/models/repositories';
import { IPlayer, ITeam } from '../database/models/schemas';
import { NotAcceptable, InternalServerError, NotFound } from '../errors';
import { ICompetition } from '../database/models/schemas/competition';
import { findByCompetitionCodeService } from './competition';

const createPlayerService = async (player: IPlayer): Promise<IPlayer> => {
	const { name, position, dateOfBirth, nationality }: IPlayer = player;

	if (!name) throw new NotAcceptable('name cannot be null');

	const playerRecord = await findByNamePlayer(name);
	if (playerRecord) throw new NotAcceptable('Player exists');

	const playerRecorded: IPlayer = await createPlayer({
		name,
		position,
		dateOfBirth,
		nationality,
	});
	if (!playerRecorded) throw new InternalServerError('Error saving player');

	return playerRecorded;
};

const createPlayersService = async (players: IPlayer[]): Promise<IPlayer[]> => {
	const playersRecorded: IPlayer[] = await createPlayers(players);

	if (!playersRecorded.length) throw new InternalServerError('Error saving players');

	return playersRecorded;
};

const findByNamePlayerService = async (name: string): Promise<IPlayer | null> => {
	const getPlayer: IPlayer | null = await findByNamePlayer(name);
	if (!getPlayer) throw new NotFound('Player not found');

	return getPlayer;
};

const findAllCompetitionPlayersService = async (
	code: string,
	teamName = '',
): Promise<IPlayer[]> => {
	const competition: ICompetition | null = await findByCompetitionCodeService(code);

	if (!competition) throw new NotFound(`Competition not found to this code: '${code}'`);

	const players: IPlayer[] = await findAllCompetitionPlayers(code, teamName);

	if (!players.length) throw new NotFound(`Players not found to this competition: '${code}'`);

	return players;
};

const findPlayersByTeamService = async (name: string): Promise<IPlayer[]> => {
	const players: IPlayer[] = await findPlayersByTeam(name);

	if (!players.length) throw new NotFound(`Players not found to this team name: ${name}`);

	return players;
};

export {
	createPlayerService,
	createPlayersService,
	findByNamePlayerService,
	findAllCompetitionPlayersService,
	findPlayersByTeamService,
};
