import mongoose, { Model, Schema, Document } from 'mongoose'
import { IApplication } from './application'

export interface IJob extends Document {
	title: string
	description: string
	budget: number
	category: string
	applications: IApplication[]
	createdAt: string
	views: number
}

const jobSchema: Schema = new Schema({
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	title: {
		type: String,
		min: 10,
		max: 100,
		required: true
	},
	description: {
		type: String,
		min: 30,
		max: 500,
		required: true
	},
	budget: {
		type: Number,
		min: 1,
		max: 999_999,
	},
	category: {
		type: String,
		enum: [ 'Programming and IT', 'Websites and online shops', 'Multimedia and photo', 'Graphics and design', 'Office works', 'Text and translations', 'Job for students' ],
		required: true,
	},
	applications: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Application'
		}
	],
	views: {
		type: Number,
		default: 0
	}
}, { collection: 'jobs', timestamps: true })

const Job: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>('Job', jobSchema)

export { Job }
