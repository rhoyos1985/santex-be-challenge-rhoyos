import { model, Schema, Document } from 'mongoose';
import { ICoach } from './coach';
import { ICompetition } from './competition';
import { IPlayer } from './player';

export interface ITeam {
	name: string;
	tla: string;
	shortName: string;
	address: string;
	areaName: string;
	competition: ICompetition;
	coach?: ICoach;
}

export interface TeamPlayer {
	name: string;
	tla: string;
	shortName: string;
	address: string;
	areaName: string;
	players?: IPlayer[];
	coach?: ICoach;
}

const TeamSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		tla: { type: String, required: true },
		shortName: { type: String, required: true },
		address: { type: String },
		areaName: { type: String },
		competition: { type: Schema.Types.ObjectId, ref: 'Competition', require: true },
		coach: { type: Schema.Types.ObjectId, ref: 'Coach' },
	},
	{ timestamps: true },
);

export interface ITeamDocument extends ITeam, Document {}

export const TeamModel = model<ITeamDocument>('Team', TeamSchema);
