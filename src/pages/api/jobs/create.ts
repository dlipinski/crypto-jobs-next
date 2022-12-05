
import dbConnect from '../../../../lib/dbConnect'
import { Job } from '../../../models/job'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
	try {
		const { method, body } = req
		const { title, description, budget, category } = body

		await dbConnect()

		if (method !== 'POST') throw new Error('Invalid method')
		if (!title || !description || !budget || !category) throw new Error('Invalid arguments')

		const job = new Job({ title, description, budget, category })
		await job.save()
		res.status(201).json({ success: true, data: job })
	} catch (error) {
		res.status(400).json({ success: false, error })
	}
}
