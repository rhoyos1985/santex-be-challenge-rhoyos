import { model, Schema, Document } from 'mongoose';

export interface ICoach {
	name?: string;
	dateOfBirth?: string;
	nationality?: string;
}

const CoachSchema: Schema = new Schema(
	{
		name: { type: String },
		dateOfBirth: { type: String },
		nationality: { type: String },
	},
	{ timestamps: true },
);

export interface ICoachDocument extends ICoach, Document {}

export const CoachModel = model<ICoachDocument>('Coach', CoachSchema);
