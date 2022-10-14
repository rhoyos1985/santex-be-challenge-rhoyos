import { IPlayer, PlayerModel } from '../schemas/player';
import { InternalServerError } from '../../../errors/internalServerError';
import Logger from '../../../logger/winstonLogger';

const hideFields = { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, competition: 0 };

const createPlayer = async ({
	name,
	position,
	dateOfBirth,
	nationality,
	competition,
	team,
}: IPlayer): Promise<IPlayer> => {
	return PlayerModel.create({ name, position, dateOfBirth, nationality, competition, team }).catch(
		(error: unknown) => {
			Logger.error(`createPlayer function: ${{ error }}`);
			throw new InternalServerError(`Error creating player`);
		},
	);
};

const createPlayers = async (players: IPlayer[]): Promise<IPlayer[]> => {
	return PlayerModel.insertMany(players).catch((error: unknown) => {
		console.log(error);
		Logger.error(`createPlayers function: ${{ error }}`);
		throw new InternalServerError(`Error creating multiples player`);
	});
};

const findByNamePlayer = async (name: string): Promise<IPlayer | null> => {
	return PlayerModel.findOne({ name }).lean().exec();
};

const findAllCompetitionPlayers = async (code: string, teamName = ''): Promise<IPlayer[]> => {
	const playersByCompetitionCode: IPlayer[] = await PlayerModel.find({ code }, hideFields)
		.lean()
		.populate({ path: 'team', select: hideFields })
		.exec();

	return !teamName.length
		? playersByCompetitionCode
		: playersByCompetitionCode.filter(
				(player: IPlayer) => player.team && player.team.name.trim() === teamName.trim(),
		  );
};

const findPlayersByTeam = async (name: string): Promise<IPlayer[]> => {
	const players: IPlayer[] = await PlayerModel.find({}, hideFields)
		.lean()
		.populate({ path: 'team', select: hideFields })
		.exec();
	return players.filter((player: IPlayer) => player.team?.shortName === name);
};

export {
	createPlayer,
	createPlayers,
	findByNamePlayer,
	findAllCompetitionPlayers,
	findPlayersByTeam,
};
