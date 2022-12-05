import { Text } from '@nextui-org/react'
import React from 'react'

const MySmall = ({ color, children }: {color?: string, children: React.ReactNode}) =>
	<Text color={color || '#777'} size={'small'} weight={'semibold'}>
		{children}
	</Text>

export default MySmall
