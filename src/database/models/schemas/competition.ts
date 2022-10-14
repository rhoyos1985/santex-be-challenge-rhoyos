import { model, Schema, Document } from 'mongoose';
import { ITeam } from './team';

export interface ICompetition {
	name: string;
	code: string;
	type: string;
	areaName: string;
	emblem?: string;
}

const CompetitionSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		code: { type: String, required: true },
		type: { type: String, required: true },
		areaName: { type: String, required: true },
		emblem: { type: String },
	},
	{ timestamps: true },
);

export interface ICompetitionDocument extends ICompetition, Document {}

export const CompetitionModel = model<ICompetitionDocument>('Competition', CompetitionSchema);
