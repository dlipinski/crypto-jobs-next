import React from 'react'
import Jobs from '../../components/jobs'
import axios from 'axios'
import { IJob } from '../../models/job'
import { Grid, Pagination, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import Categories from '../../components/categories'
import { GetJobsResponse } from '../api/jobs'

interface IndexProps {
	jobs: IJob[]
	categories: []
	totalJobs: number
}

const Index = ({ jobs, categories, totalJobs }: IndexProps ) => {
	const { query: { page }, push } = useRouter()
	const _page = parseInt(page as string) || 1

	return (
		<Grid.Container alignItems={'flex-start'} gap={2}>
			<Grid xs={12}>
				<Text h1>{'Find a job '}<Text span css={{
					textGradient: '45deg, $blue600 -20%, $pink600 50%',
				}}>{' among '}{totalJobs} {'available'}</Text></Text>
			</Grid>

			<Grid xs={3} md={3}>
				<Categories categories={categories}/>
			</Grid>
			<Grid xs={9} md={9} style={{ display: 'grid', gap: '12px', justifyItems: 'center' }}>
				<Jobs jobs={jobs}/>
				<Pagination
					total={totalJobs/2}
					page={_page}
					size={'lg'}
					animated={false}
					onChange={page => push(`/jobs?page=${page}`)}/>
			</Grid>
		</Grid.Container>
	)
}

export default Index

export async function getServerSideProps(req) {
	const { page } = req.query
	const response = await axios.get(`${process.env.HOST}/api/jobs?page=${page-1}`)
	const { data: { jobs, categories, totalJobs } }: GetJobsResponse = response.data
	return { props: { jobs, categories, totalJobs } }
}

