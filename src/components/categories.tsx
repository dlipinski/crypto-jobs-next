import React from 'react'
import { Badge, Button, Grid, Text } from '@nextui-org/react'
import { Folder, Buy, Camera, Image2, Work, Document } from 'react-iconly'

interface CategoriesProps {
	categories: {
		_id: string,
		count: number
	}[]
}

const icons = {
	'Programming and IT': <Folder set={'bulk'}/>,
	'Websites and online shops': <Buy set={'bulk'}/>,
	'Multimedia and photo': <Camera set={'bulk'}/>,
	'Graphics and design': <Image2 set={'bulk'}/>,
	'Office works': <Work set={'bulk'}/>,
	'Text and translations': <Document set={'bulk'}/>
}
const Categories = ({ categories }: CategoriesProps) =>
	<Grid.Container gap={1}>
		<Grid xs={12}>
			<Text h4 color={'#777'}>{'Categories'}</Text>
		</Grid>
		{categories.map(category =>
			<Grid xs={12} key={category._id} >
				<Badge variant="flat" content={category.count} color={'primary'} size="xs">
					<Button flat auto icon={icons[ category._id ]}>{category._id}</Button>
				</Badge>
			</Grid>
		)}
	</Grid.Container>


export default Categories
