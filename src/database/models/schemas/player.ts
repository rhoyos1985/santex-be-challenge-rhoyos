import { model, Schema, Document } from 'mongoose';
import { ICompetition } from './competition';
import { ITeam } from './team';

export interface IPlayer {
	name?: string;
	position?: string;
	dateOfBirth?: string;
	nationality?: string;
	competition?: ICompetition;
	team?: ITeam;
}

const PlayerSchema: Schema = new Schema(
	{
		name: { type: String },
		position: { type: String },
		dateOfBirth: { type: String },
		nationality: { type: String },
		competition: { type: Schema.Types.ObjectId, ref: 'Competition' },
		team: { type: Schema.Types.ObjectId, ref: 'Team' },
	},
	{ timestamps: true },
);

export interface IPlayerDocument extends IPlayer, Document {}

export const PlayerModel = model<IPlayerDocument>('Player', PlayerSchema);
