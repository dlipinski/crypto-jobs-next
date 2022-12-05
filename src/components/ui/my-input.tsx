
import { Input, Textarea } from '@nextui-org/react'
import React from 'react'
import MySmall from './my-small'

const MyInput = (props: any) =>
	<div style={ { display: 'grid', gap: '4px', alignContent: 'flex-start' } }>
		{props.myLabel && <MySmall color={'text'}>{props.myLabel}</MySmall>}
		{
			props.textarea
				? <Textarea {...props}/>
				: <Input {...props}/>
		}

		{props.myDescription && <MySmall>{props.myDescription}</MySmall>}
	</div>

export default MyInput
