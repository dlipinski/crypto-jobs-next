import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { useApplications } from './applicationSlice'
import { useAuth } from '../auth/authSlice'
import { useRouter } from 'next/router'
import { Button, Card, Grid } from '@nextui-org/react'
import SignInButton from '../auth/SignInButton'
import MyInput from '../../components/ui/my-input'

const ApplicationForm = () => {
	const [ salary, setSalary ] = useState<string>('')
	const [ estimatedDays, setEstimatedDays ] = useState<string>('')
	const [ description, setDescription ] = useState('')
	const dispatch = useAppDispatch()
	const { query: { jobId } } = useRouter()
	const { accessToken } = useAuth()
	const { creating, createApplication } = useApplications()

	const onSubmit = () =>
		jobId && !Array.isArray(jobId) && accessToken &&
			dispatch(createApplication({
				accessToken,
				jobId,
				description,
				salary: parseInt(salary),
				estimatedDays: parseInt(estimatedDays)
			}))

	return (
		<>
			<Card>
				<Card.Body style={{ padding: '16px' }}>
					<Grid.Container gap={2} >
						<Grid xs={6} style={{ display: 'grid' }}>
							<MyInput myLabel={'Salary'} type={'number'} value={salary} onChange={e => setSalary(e.target.value)} />
						</Grid>
						<Grid xs={6} style={{ display: 'grid' }}>
							<MyInput myLabel={'Estimated days'}  type={'number'} value={estimatedDays} onChange={e => setEstimatedDays(e.target.value)}/>
						</Grid>
						<Grid xs={12} style={{ display: 'grid' }}>
							<MyInput myLabel={'Description'} value={description} onChange={e => setDescription(e.target.value)}/>
						</Grid>
						<Grid xs={12} style={{ display: 'grid' }}>
							{
								accessToken
									? <Button disabled={creating} onPress={onSubmit} color={'gradient'}>Submit offer</Button>
									: <SignInButton/>
							}
						</Grid>
					</Grid.Container>
				</Card.Body>
			</Card>
		</>
	)
}

export default ApplicationForm
