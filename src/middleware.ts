import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

export async function middleware(request: NextRequest) {
	const authHeader = request.headers.get('authorisation')
	const accessToken = authHeader && authHeader.split(' ')[ 1 ]

	if (accessToken == null) return NextResponse.redirect(new URL('/api/auth/unauthorized', request.url))

	try {
		await jose.jwtVerify(accessToken, new TextEncoder().encode(process.env.SECRET_JTW_CODE as string))
	} catch (err) {
		return NextResponse.redirect(new URL('/api/auth/unauthorized', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [ '/api/jobs/create', '/api/jobs/add-application' ]
}
