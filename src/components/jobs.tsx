import React from 'react'
import Job from './job'
import { IJob } from '../models/job'
import { Grid } from '@nextui-org/react'

interface JobsProps {
	jobs: IJob[]
}

const Jobs = ({ jobs }: JobsProps) => (
	<Grid.Container gap={2} style={{ padding: 0 }}>
		{
			jobs.map(job =>
				<Grid xs={12} key={job._id}>
					<Job
						isListItem={true}
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
			)
		}
	</Grid.Container>
)

export default Jobs
