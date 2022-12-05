import React from 'react'
import Navbar from './navbar'
import { Container, Spacer } from '@nextui-org/react'

interface LayoutProps {
	children: React.ReactNode
}
export default function Layout({ children }:LayoutProps) {
	return (
		<>

			<Navbar />
			<Spacer y={0.5}/>
			<Container md>{children}</Container>
		</>
	)
}
