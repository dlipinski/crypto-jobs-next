import React from 'react'
import { Badge, Button, Card, Grid, Text } from '@nextui-org/react'
import { Folder, Buy, Camera, Image2, Work, Document, Home } from 'react-iconly'
import Link from 'next/link'

interface CategoriesProps {
	categories: {
		_id: string,
		count: number
	}[],
	totalCount: number
}

const icons = {
	'All': <Home set={'bulk'}/>,
	'Programming and IT': <Folder set={'bulk'}/>,
	'Websites and online shops': <Buy set={'bulk'}/>,
	'Multimedia and photo': <Camera set={'bulk'}/>,
	'Graphics and design': <Image2 set={'bulk'}/>,
	'Office works': <Work set={'bulk'}/>,
	'Text and translations': <Document set={'bulk'}/>
}
const Categories = ({ categories, totalCount }: CategoriesProps) =>
	<div style={{ display: 'flex' }}>
		<Card variant={'flat'}>
			<Card.Body>
				<Grid.Container gap={1}>
					<Grid xs={12}>
						<Text h4 color={'#777'}>{'Categories'}</Text>
					</Grid>
					<Grid xs={12}>
						<Badge variant="flat" content={totalCount} color={'primary'} size="xs">
							<Link href={'/jobs'}>
								<Button flat auto icon={icons[ 'All' ]}>{'All jobs'}</Button>
							</Link>
						</Badge>
					</Grid>
					{categories.map(category =>
						<Grid xs={12} key={category._id} >
							<Badge variant="flat" content={category.count} color={'primary'} size="xs">
								<Link href={`/jobs/?category=${encodeURIComponent(category._id)}`}>
									<Button flat auto icon={icons[ category._id ]}>{category._id}</Button>
								</Link>
							</Badge>
						</Grid>
					)}
				</Grid.Container>
			</Card.Body>
		</Card>
	</div>


export default Categories
