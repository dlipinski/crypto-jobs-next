import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { useJobs } from './jobsSlice'
import { useAuth } from '../auth/authSlice'
import { Button, Card, Grid } from '@nextui-org/react'
import SignInButton from '../auth/SignInButton'
import MyInput from '../../components/ui/my-input'

const JobForm = () => {
	const [ title, setTitle ] = useState('')
	const [ description, setDescription ] = useState('')
	const [ budget, setBudget ] = useState('')
	const [ category, setCategory ] = useState('IT')
	const dispatch = useAppDispatch()
	const { createJob, creating } = useJobs()
	const { accessToken } = useAuth()

	const onSubmit = () =>
		dispatch(createJob({ accessToken, jobData: { title, description, budget: parseInt(budget), category } }))

	return (
		<Card>
			<Card.Body>
				<Grid.Container gap={2}>
					<Grid xs={12} style={{ display: 'grid' }}>
						<MyInput
							myLabel={'Job name'}
							myDescription={'The title is a brief description of the work. The maximum character is 200 characters.'}
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
					</Grid>
					<Grid xs={12} style={{ display: 'grid' }}>
						<MyInput
							myLabel={'Job details'}
							textarea
							myDescription={'Provide as much detail as possible. A detailed description help freelancers have a further understanding of this work. The description will be taken into consideration in case of a dispute. The maximum character is 2048. The job order may be rejected due to the deadline only after exceeding 7 days of work. Freelancers may propose the shorter time, but that is a non-legally binding declaration.'}
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
					</Grid>
					<Grid xs={12} style={{ display: 'grid' }}>
						<MyInput
							myLabel={'Budget'}
							labelLeft="$"
							placeholder={'000'}
							type='number'
							value={budget}
							onChange={e => setBudget(e.target.value)}
						/>
					</Grid>
					<Grid xs={12} style={{ display: 'grid' }}>
						{
							accessToken
								? <Button disabled={creating} onClick={onSubmit} color={'gradient'}>{'Post a job'}</Button>
								: <SignInButton/>
						}
					</Grid>
				</Grid.Container>
			</Card.Body>
		</Card>
	)
}

export default  JobForm
