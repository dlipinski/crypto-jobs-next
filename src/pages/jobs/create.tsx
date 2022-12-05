import React from 'react'
import { Spacer, Grid, Text } from '@nextui-org/react'
import dynamic from 'next/dynamic'
const  JobForm = dynamic(() => import('../../features/jobs/JobForm'), { ssr: false })
import image from '../../assets/undraw_uploading_re_okvh(1).svg'
import Image from 'next/image'

const Create = () =>
	<>
		<Spacer y={1}/>
		<Text h1>{'Post job offer '}<Text span css={{
			textGradient: '45deg, $purple600 -20%, $pink600 100%',
		}}>{' for over '}{123} {'developers'}</Text></Text>
		<Spacer y={1}/>
		<Grid.Container gap={3}>
			<Grid xs={5}>
				<Image src={image.src}/>
			</Grid>
			<Grid xs={7}>
				<JobForm/>
			</Grid>
		</Grid.Container>

	</>

export default Create
