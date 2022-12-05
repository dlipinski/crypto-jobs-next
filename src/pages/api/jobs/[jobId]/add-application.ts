
import dbConnect from '../../../../../lib/dbConnect'
import { Job } from '../../../../models/job'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Application } from '../../../../models/application'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
	try {
		const { method, query, body } = req
		const { jobId } = query
		const { description, estimatedDays, salary } = body

		await dbConnect()

		if (method !== 'POST') throw new Error('Invalid method')
		if (!jobId || Array.isArray(jobId)) throw new Error('Invalid parameters')
		if (!description || !estimatedDays || !salary)  throw new Error('Invalid arguments')

		const job = await Job.findById(jobId)
		const application = new Application({ job: jobId, description, estimatedDays, salary })
		await application.save()
		job.applications.push(application)
		await job.save()
		res.status(200).json({ success: true, data: job })
	} catch (error) {
		res.status(400).json({ success: false, error })
	}
}
