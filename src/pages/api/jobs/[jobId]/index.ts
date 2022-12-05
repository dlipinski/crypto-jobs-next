
import dbConnect from '../../../../../lib/dbConnect'
import { Job } from '../../../../models/job'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
	try {
		const { method, query } = req
		const { jobId } = query

		await dbConnect()

		if (method !== 'GET') throw new Error('Invalid method')
		if (!jobId) throw new Error('Invalid parameters')

		const job = await Job.findById(jobId).populate('applications')
		res.status(200).json({ success: true, data: job })
	} catch (error) {
		console.warn(error)
		res.status(400).json({ success: false, error })
	}
}
