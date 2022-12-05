import React, { useRef, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { useApplications } from './applicationSlice'
import { useAuth } from '../auth/authSlice'
import { useRouter } from 'next/router'
import { Button, Card, Collapse, Grid, Loading, Text } from '@nextui-org/react'
import SignInButton from '../auth/SignInButton'
import MyInput from '../../components/ui/my-input'
import { ChevronLeft, Paper } from 'react-iconly'

const ApplicationForm = () => {
	const [ salary, setSalary ] = useState<string>('')
	const [ estimatedDays, setEstimatedDays ] = useState<string>('')
	const [ description, setDescription ] = useState('')
	const dispatch = useAppDispatch()
	const { query: { jobId } } = useRouter()
	const { accessToken } = useAuth()
	const { creating, createApplication } = useApplications()
	const hoverRef = useRef(null)

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
			<Card
				variant='bordered'
				ref={hoverRef}
				style={{ padding: 0 }}>
				<Card.Body style={{ padding: 0 }}>
					<Collapse
						title={<Text weight={'semibold'}>Make an offer</Text>}
						contentLeft={<Paper set={'bulk'} size={'large'} primaryColor={'var(--nextui-colors-text)'}/>}
						arrowIcon={<ChevronLeft set={'light'} size={'medium'}/>}
						bordered
						//expanded={isMobile ? isHover : undefined}
					>
						<Grid.Container gap={1} >
							<Grid xs={12} md={6} style={{ display: 'grid' }}>
								<MyInput myLabel={'Expected offer'} myDescription={'Enter numbers to check your income tax and net amount. Please check the given value and the VAT fields, those are the final amount for this job. (VAT may not add for the foreign company)'} type={'number'} value={salary} onChange={e => setSalary(e.target.value)} />
							</Grid>
							<Grid xs={12} md={6} style={{ display: 'grid' }}>
								<MyInput myLabel={'Days of work'} myDescription={'The number of days for completing the project (minimum 7 days). You can also declare a shorter deadline in the description.'}  type={'number'} value={estimatedDays} onChange={e => setEstimatedDays(e.target.value)}/>
							</Grid>
							<Grid xs={12} style={{ display: 'grid' }}>
								<MyInput textarea myDescription={'You can send the execution plan of the work to the client. The more specific details you provide, the more attractive the message will be. You can also briefly describe work experience and even included some similar work as a reference.'} myLabel={'Description'} value={description} onChange={e => setDescription(e.target.value)}/>
							</Grid>
							<Grid xs={12} md={2} style={{ display: 'grid' }}>
								{
									accessToken
										? <Button disabled={creating}  onPress={onSubmit} color={'primary'}>
											{
												creating
													? <Loading type="points" color="currentColor" size="sm" />
													: 'Submit offer'
											}
										</Button>
										: <SignInButton/>
								}
							</Grid>
						</Grid.Container>
					</Collapse>
				</Card.Body>
			</Card>
		</>
	)
}

export default ApplicationForm
