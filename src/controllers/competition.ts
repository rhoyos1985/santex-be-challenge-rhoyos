import { Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';
import { BadRequest, NotFound } from '../errors';
import { ICompetition, ITeam } from '../database/models/schemas';
import { createCompetitionService, findByCompetitionCodeService } from '../services/competition';
import { messageResponse } from '../utility';
import env from '../env';
import { InternalServerError } from '../errors/internalServerError';
import { createTeamsService } from '../services/team';

const importCompetition = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { code } = req.params;

		if (!code) throw new BadRequest('"code" cannot be empty');
		if (!(env.AUTH_API_TOKEN || env.API_FOOTBALL_DATA_URL))
			throw new InternalServerError('There is a error in the api');

		const response = await fetch(`${env.API_FOOTBALL_DATA_URL}/competitions/${code}/teams`, {
			method: 'GET',
			headers: {
				'X-Auth-Token': env.AUTH_API_TOKEN,
				'Content-Type': 'application/json',
			},
		});

		if (response.status !== 200)
			throw new NotFound(`This code: ${code} is not available for this account.`);

		const data: any = await response.json();

		const competitionRecorded: ICompetition = await createCompetitionService(data);

		res
			.status(200)
			.send(
				messageResponse(
					competitionRecorded ? 200 : 204,
					competitionRecorded
						? 'Competition was created succesfully'
						: 'Competition was not created ',
					competitionRecorded,
				),
			);
	} catch (error: unknown) {
		next(error);
	}
};

const findCompetitionByCode = async (req: Request, res: Response, next: NextFunction) => {
	try {
		console.log(req.params);
		const { code } = req.params;

		if (!code) throw new BadRequest('"code" cannot be empty');

		const competition: ICompetition | null = await findByCompetitionCodeService(code);

		res
			.status(200)
			.send(
				messageResponse(
					competition ? 200 : 204,
					competition ? 'Competition data Found' : 'No Competition data Found',
					competition,
				),
			);
	} catch (error: unknown) {
		next(error);
	}
};

export { importCompetition, findCompetitionByCode };
