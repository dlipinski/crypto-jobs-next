import mongoose, { Schema, Model, Document } from 'mongoose'

export interface IApplication  extends Document {
	job: string
    estimatedDays: number
    description: string
    salary: number
	createdAt: string
}

const applicationSchema: Schema = new Schema({
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	job: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Job'
	},
	estimatedDays: {
		type: Number,
		min: 1,
		max: 999,
		required: true
	},
	description: {
		type: String,
		min: 30,
		max: 500,
		required: true
	},
	salary: {
		type: Number,
		min: 1,
		max: 999_999,
		required: true
	}
}, { collection: 'applications', timestamps: true })


const Application: Model<IApplication>  =
	mongoose.models.Application ||
	mongoose.model<IApplication>('Application', applicationSchema)


export { Application }
