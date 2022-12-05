import React from 'react'
import { Button, Card, Grid, Spacer, Text, Link } from '@nextui-org/react'
import { Calendar, Paper, Show } from 'react-iconly'
import MySmall from './ui/my-small'
import { IApplication } from '../models/application'
import { IJob } from '../models/job'
interface JobProps {
	_id: IJob['_id']
	title: IJob['title']
	description: IJob['description']
	budget: IJob['budget']
	category: IJob['category']
	applications: IJob['applications']
	createdAt: IJob['createdAt']
}

const Job = ({ _id, title, description, budget, category, applications, createdAt }: JobProps) =>
	<Card style={{ paddingLeft: '16px', paddingRight: '16px' }}>
		<Card.Body >
			<Grid.Container alignItems={'flex-start'} justify={'space-between'}>
				<Grid xs={10} style={{ display: 'grid' }}>
					<Text weight={'extrabold'}>
						<Link href={`/jobs/${_id}`} color="text" underline>
							{title}
						</Link>
					</Text>
					<div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
						<Calendar set={'bulk'} size={'small'} filled primaryColor={'#777'}/>
						<MySmall>{new Date(createdAt).toLocaleDateString('pl-PL')}</MySmall>
					</div>
				</Grid>
				<Grid xs={2} style={{ display: 'grid' }} justify={'flex-end'}>
					<MySmall>Budget:</MySmall>
					<Text style={{ marginTop: '-8px' }} weight={'bold'} color={'$success'}>${budget}</Text>
				</Grid>
				<Grid xs={12} style={{ display: 'grid' }}>
					<Spacer y={.75}/>
					<Text color={'#777'} weight={'semibold'} size={'small'}>{description}</Text>
					<Spacer y={.75}/>
				</Grid>
				<Grid>
					<Button size="xs" flat>{category}</Button>
				</Grid>
				<Grid>
					<div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
						<MySmall>{13}</MySmall>
						<Show set={'bulk'} size={'small'} filled primaryColor={'#777'}/>
						·
						<MySmall>{applications.length}</MySmall>
						<Paper set={'bulk'} size={'small'} filled primaryColor={'#777'}/>
					</div>
				</Grid>
			</Grid.Container>
		</Card.Body>
	</Card>

export default Job
