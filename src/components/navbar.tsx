import React from 'react'
import { Switch, useTheme, Navbar as NextUINavbar, Text, Link, Spacer, Button } from '@nextui-org/react'
import { ShieldDone, Chat } from 'react-iconly'
import { useTheme as useNextTheme } from 'next-themes'
import dynamic from 'next/dynamic'
const  SignInButton = dynamic(() => import('../features/auth/SignInButton'), { ssr: false })
const collapseItems = [
	{ name: 'Find a job', href: '/jobs' },
	{ name: 'Post job offer', href: '/jobs/create' }
]
export default function Navbar() {
	const { setTheme } = useNextTheme()
	const { isDark } = useTheme()

	return (
		<NextUINavbar variant={'sticky'}>
			<NextUINavbar.Brand>
				<NextUINavbar.Toggle showIn={'xs'} aria-label='toggle navigation' />
				<Spacer x={0.5}/>
				<ShieldDone set={'broken'} size={'medium'}/>
				<Spacer x={0.125}/>
				<Text weight={'medium'} color='inherit' hideIn='xs'>
					CRYPTO_JOBS
				</Text>
			</NextUINavbar.Brand>
			<NextUINavbar.Content enableCursorHighlight hideIn='xs'>
				<NextUINavbar.Link  href='/jobs'>Find a job</NextUINavbar.Link>
				<NextUINavbar.Link  href='/jobs/create'>Post job offer</NextUINavbar.Link>
			</NextUINavbar.Content>
			<NextUINavbar.Content>
				<NextUINavbar.Item>
					<Switch
						checked={isDark}
						onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
					/>
				</NextUINavbar.Item>
				<NextUINavbar.Item>
					<Button color='default' auto icon={<Chat set={'bulk'}/>}/>
				</NextUINavbar.Item>
				<NextUINavbar.Item>
					<SignInButton/>
				</NextUINavbar.Item>
			</NextUINavbar.Content>
			<NextUINavbar.Collapse>
				{collapseItems.map((item) => (
					<NextUINavbar.CollapseItem key={item.href}>
						<Link
							color='inherit'
							css={{
								minWidth: '100%'
							}}
							href={item.href}
						>
							{item.name}
						</Link>
					</NextUINavbar.CollapseItem>
				))}
			</NextUINavbar.Collapse>
		</NextUINavbar>
	)
}
