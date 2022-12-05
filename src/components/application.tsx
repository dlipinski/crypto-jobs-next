import { Card, Grid, Text } from '@nextui-org/react'
import { Calendar } from 'react-iconly'
import React from 'react'
import { IApplication } from '../models/application'

interface ApplicationProps {
	description: IApplication['description']
	salary: IApplication['salary']
	estimatedDays: IApplication['estimatedDays']
	createdAt: IApplication['createdAt']
}

const Application = ({ description, salary, createdAt, estimatedDays }: ApplicationProps) =>
	<Card variant={'flat'}>
		<Card.Body style={{ padding: '16px' }}>
			<Grid.Container alignItems={'center'} justify={'space-between'} gap={1}>
				<Grid xs={6}>
					<div>
						<Text  weight={'bold'} color={'#777'} size={'small'}>{'Expected offer:'}</Text>
						<Text style={{ marginTop: '-8px' }} weight={'bold'} color={'$success'}>${salary}</Text>
					</div>
				</Grid>
				<Grid xs={6} justify={'flex-end'}>
					<div>
						<Text  weight={'bold'} color={'#777'} size={'small'}>{'Estimated days:'}</Text>
						<Text style={{ marginTop: '-8px' }} weight={'bold'} color={'text'}>{estimatedDays}</Text>
					</div>

				</Grid>
				<Grid xs={12}>
					<Text color={'#777'} weight={'semibold'} size={'small'}>{description}</Text>
				</Grid>
				<Grid xs={12}>
					<div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
						<Text size={'small'} weight={'semibold'} color={'#777'}>{createdAt}</Text>
						<Calendar set={'bulk'} size={'small'} filled primaryColor={'#777'}/>
					</div>
				</Grid>
			</Grid.Container>
		</Card.Body>
	</Card>

export default Application
