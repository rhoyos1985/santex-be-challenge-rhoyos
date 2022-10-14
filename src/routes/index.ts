import express from 'express';
import {
	importCompetition,
	findCompetitionByCode,
	findTeamsByLeagueCode,
	findTeamByName,
	findLeaguePlayers,
	findPlayersByTeam,
} from '../controllers';

const router = express.Router();

router.get('/import-league/:code', importCompetition);
router.get('/league/:code', findCompetitionByCode);
router.get('/league/:code/teams', findTeamsByLeagueCode);
router.get('/league/:code/players', findLeaguePlayers);
router.get('/league/team/:teamName', findTeamByName);
router.get('/league/team/:name/players', findPlayersByTeam);

export default router;
