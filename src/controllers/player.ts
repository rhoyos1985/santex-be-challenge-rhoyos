import { Request, Response, NextFunction } from 'express';
import { messageResponse } from '../utility';
import { IPlayer } from '../database/models/schemas';
import { BadRequest } from '../errors/badRequest';
import { findAllCompetitionPlayersService, findPlayersByTeamService } from '../services/player';

const findLeaguePlayers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { code } = req.params;
		const { teamName = '' } = req.query;

		if (!code) throw new BadRequest('code must be include in the request');

		const players: IPlayer[] = await findAllCompetitionPlayersService(code, teamName.toString());

		res
			.status(200)
			.send(
				messageResponse(
					players.length ? 200 : 204,
					players.length ? 'Players data Found' : 'No Players data Found',
					players,
				),
			);
	} catch (error: unknown) {
		next(error);
	}
};

const findPlayersByTeam = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name } = req.params;

		if (!name) throw new BadRequest('name must be include in the request');

		const players: IPlayer[] = await findPlayersByTeamService(name);

		res
			.status(200)
			.send(
				messageResponse(
					players.length ? 200 : 204,
					players.length ? 'Players data Found' : 'No Players data Found',
					players,
				),
			);
	} catch (error: unknown) {
		next(error);
	}
};

export { findLeaguePlayers, findPlayersByTeam };
