import React from 'react'
import axios from 'axios'
import { IJob } from '../../models/job'
import dynamic from 'next/dynamic'
const  ApplicationForm = dynamic(() => import('../../features/application/applicationForm'), { ssr: false })
import { Spacer, Text, Grid } from '@nextui-org/react'
import Job from '../../components/job'
import Application from '../../components/application'

const JobId = ({ job }: { job: IJob }) =>
	<div style={{ padding: '16px', display: 'grid', gap: '8px' }}>
		<Text h1>{'Job'}</Text>
		<Job
			_id={job._id}
			title={job.title}
			description={job.description}
			budget={job.budget}
			category={job.category}
			applications={job.applications}
			createdAt={job.createdAt}
		/>
		<Spacer y={1}/>
		<ApplicationForm/>
		<Text h2>{'Submitted applications'} {job.applications.length}</Text>
		<Grid.Container gap={2}>
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
	</div>

export default JobId

export async function getServerSideProps(req) {
	const { jobId } = req.query
	const response = await axios.get(`http://localhost:3000/api/jobs/${jobId}`)
	const job = response.data.data
	return { props: { job } }
}

