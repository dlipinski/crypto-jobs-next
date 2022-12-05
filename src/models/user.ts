import mongoose, { Model, Document, Schema } from 'mongoose'
import { IApplication } from './application.js'
import { IJob } from './job'

export interface IUser extends Document {
    address: string
	description: string
	jobs: IJob[]
	applications: IApplication[]
}

const userSchema: Schema = new Schema({
	address: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String
	},
	jobs: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Job'
		}
	],
	applications: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Application'
		}
	]
}, { collection: 'users', timestamps: true })

const User: Model<IUser> =
	mongoose.models.User ||
	mongoose.model<IUser>('User', userSchema)

export { User }
