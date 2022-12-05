import React from 'react'
import Job from './job'
import { IJob } from '../models/job'
import { Grid } from '@nextui-org/react'

interface JobsProps {
	jobs: IJob[]
}

const Jobs = ({ jobs }: JobsProps) => (
	<Grid.Container gap={2}>
		{
			jobs.map(job =>
				<Grid key={job._id}>
					<Job
						_id={job._id}
						title={job.title}
						description={job.description}
						budget={job.budget}
						category={job.category}
						applications={job.applications}
						createdAt={job.createdAt}
					/>
				</Grid>
			)
		}
	</Grid.Container>
)

export default Jobs
