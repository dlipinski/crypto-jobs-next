import React from 'react'
import axios from 'axios'
import { IJob } from '../../models/job'
import dynamic from 'next/dynamic'
const  ApplicationForm = dynamic(() => import('../../features/application/applicationForm'), { ssr: false })
import { Text, Grid } from '@nextui-org/react'
import Job from '../../components/job'
import Application from '../../components/application'

const JobId = ({ job }: { job: IJob }) =>
	<Grid.Container gap={2}>
		<Grid xs={12}>
			<Text h1>{'Job '}<Text span    css={{
				textGradient: '45deg, $yellow600 -20%, $red600 100%',
			}}>{' with '}{job.applications.length} {' offers'}</Text></Text>
		</Grid>
		<Grid xs={12}>
			<Job
				isListItem={false}
				_id={job._id}
				title={job.title}
				description={job.description}
				budget={job.budget}
				category={job.category}
				applications={job.applications}
				createdAt={job.createdAt}
				views={job.views}
			/>
		</Grid>
		<Grid xs={12}>
			<ApplicationForm/>
		</Grid>
		<Grid xs={12} style={{ display: 'grid' }}>
			<Text h3>{'Offers'}</Text>
			<Grid.Container gap={2} style={{ padding: 0 }}>
				{
					job.applications.map(application =>
						<Grid key={application._id} xs={12}>
							<Application
								description={application.description}
								createdAt={application.createdAt}
								estimatedDays={application.estimatedDays}
								salary={application.salary}
							/>
						</Grid>
					)
				}
			</Grid.Container>
		</Grid>

	</Grid.Container>
export default JobId

export async function getServerSideProps(req) {
	const { jobId } = req.query
	const response = await axios.get(`${process.env.HOST}/api/jobs/${jobId}`)
	const job = response.data.data
	return { props: { job } }
}

