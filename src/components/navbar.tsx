import React from 'react'
import { Navbar as NextUINavbar, Text, Link, Spacer, Button } from '@nextui-org/react'
import { ShieldDone, Chat } from 'react-iconly'
import dynamic from 'next/dynamic'
const  SignInButton = dynamic(() => import('../features/auth/SignInButton'), { ssr: false })
const collapseItems = [
	{ name: 'Find a job', href: '/jobs' },
	{ name: 'Post job offer', href: '/jobs/create' }
]
export default function Navbar() {
	return (
		<NextUINavbar variant={'sticky'}>
			<NextUINavbar.Brand>
				<NextUINavbar.Toggle showIn={'xs'} aria-label='toggle navigation' />
				<Spacer x={0.5}/>
				<ShieldDone set={'bulk'} size={'large'} primaryColor='#0072F5'/>
				<Spacer x={0.125}/>
				<Text weight={'bold'} color='inherit' hideIn='xs'>
					CRYPTO<Text span color={'#0072F5'}>_JOBS</Text>
				</Text>
			</NextUINavbar.Brand>
			<NextUINavbar.Content enableCursorHighlight hideIn='xs'>
				<NextUINavbar.Link  href='/jobs'>Find a job</NextUINavbar.Link>
				<NextUINavbar.Link  href='/jobs/create'>Post job offer</NextUINavbar.Link>
			</NextUINavbar.Content>
			<NextUINavbar.Content>
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
