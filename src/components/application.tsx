import { Card, Grid, Spacer, Text } from '@nextui-org/react'
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
	<Card>
		<Card.Body>
			<div style={{ padding: '16px' }}>
				<Grid.Container alignItems={'center'} justify={'space-between'}>
					<Grid xs>
						<div>
							<Text  weight={'bold'} color={'#777'} size={'small'}>Salary:</Text>
							<Text style={{ marginTop: '-8px' }} weight={'bold'} color={'$success'}>${salary}</Text>
						</div>
					</Grid>
					<Grid xs justify={'flex-end'}>
						<div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
							<Text size={'small'} weight={'semibold'} color={'#777'}>{new Date(createdAt).toLocaleDateString('pl-PL')}</Text>
							<Calendar set={'bulk'} size={'small'} filled primaryColor={'#777'}/>
						</div>
					</Grid>
				</Grid.Container>
				<Spacer y={.5}/>
				<Text color={'#777'} weight={'semibold'} size={'small'}>{description}</Text>
			</div>
		</Card.Body>
	</Card>

export default Application
