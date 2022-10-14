import { Request, Response, NextFunction } from 'express';
import { messageResponse } from '../utility';
import { findByTLATeam } from '../database/models/repositories';
import { ITeam, TeamPlayer } from '../database/models/schemas/team';
import { findTeamByLeagueCodeService, findTeamByNameService } from '../services/team';

const findTeamsByLeagueCode = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { code } = req.params;

		const teams: ITeam[] | null = await findTeamByLeagueCodeService(code);

		res
			.status(200)
			.send(
				messageResponse(
					teams.length ? 200 : 204,
					teams.length ? 'Team data Found' : 'No Team data Found',
					teams,
				),
			);
	} catch (error: unknown) {
		next(error);
	}
};

const findTeamByName = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { teamName } = req.params;

		const team: TeamPlayer = await findTeamByNameService(teamName);

		res
			.status(200)
			.send(
				messageResponse(team ? 200 : 204, team ? 'Team data Found' : 'No Team data Found', team),
			);
	} catch (error: unknown) {
		next(error);
	}
};

export { findTeamsByLeagueCode, findTeamByName };
