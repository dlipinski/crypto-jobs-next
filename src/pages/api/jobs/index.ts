
import dbConnect from '../../../../lib/dbConnect'
import { IJob, Job } from '../../../models/job'
import type { NextApiRequest, NextApiResponse } from 'next'

export interface GetJobsResponse {
	success: boolean
	data: {
		jobs: IJob[],
		categories: {
			_id: string
			count: number
		}[]
		totalJobs: number
	}

}

const PER_PAGE = 10
export default async function handler (req: NextApiRequest, res: NextApiResponse<GetJobsResponse>) {
	try {
		const { method, query } = req
		const { page } = query

		await dbConnect()

		if (method !== 'GET') throw new Error('Invalid method')

		const _page = page ? parseInt(page.toString()) : 0

		const jobs = await Job.find({},{}, { skip: _page * PER_PAGE, limit: PER_PAGE })
		const categories = await Job.aggregate([
			{ $group : { _id: '$category', count: { $sum:1 } } }
		])
		const totalJobs = await Job.count({})
		res.status(200).json({ success: true, data: { jobs, categories, totalJobs } })
	} catch (error) {
		console.log(error)
		res.status(400).json({ success: false, data: error })
	}
}
