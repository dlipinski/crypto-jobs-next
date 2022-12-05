import { ethers } from 'ethers'
import { User } from '../../../models/user'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../lib/dbConnect'
import * as jose from 'jose'

type ResponseData = {
    accessToken: string;
    expiresIn: number;
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	const { method, body } = req
	const { message, signedMessage } = body

	if (method !== 'POST') return res.status(400)

	if(!message || !signedMessage) return res.status(400)

	await dbConnect()

	const signedAddress = ethers.utils.verifyMessage(message, signedMessage)

	const userExists = await User.exists({ address: signedAddress })
	if (!userExists) {
		const user = new User({ address: signedAddress })
		await user.save()
	}

	const accessToken = await generateAccessToken(signedAddress)

	return res.json({
		accessToken,
		expiresIn: 60_000
	})
}

const generateAccessToken = async (address: string): Promise<string> =>
	await new jose.SignJWT({ address })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
	//	.setIssuer('urn:example:issuer')
	//	.setAudience('urn:example:audience')
		.setExpirationTime('2h')
		.sign(new TextEncoder().encode(process.env.SECRET_JTW_CODE))

//	jwt.sign(address, process.env.SECRET_JTW_CODE, { expiresIn: 60_000 })
