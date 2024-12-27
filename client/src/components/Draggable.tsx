import React from 'react'
import { Box, Stack, HStack, VStack, Heading } from '@chakra-ui/react'

import { useDrag } from 'react-dnd'

interface Mechanism {
	id: string
	name: string
	type: string
	config?: {
		servoPin?: number
		angle?: number
	}
}

const Draggable = ({ item }: { item: Mechanism }) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'MECHANISM',
		item: { id: item.id, name: item.name, type: item.type },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	}))

	return (
		<Box
			ref={drag}
			opacity={isDragging ? 0.5 : 1}
			padding='10px'
			border='1px solid #ccc'
			backgroundColor='#f0f0f0'
			color='black'
			cursor='move'
			borderRadius='5px'
			w='100%'
			maxW='250px'
		>
			{item.name}
		</Box>
	)
}

export default Draggable
