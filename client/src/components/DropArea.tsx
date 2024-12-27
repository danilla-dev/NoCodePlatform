import React from 'react'
import { useDrop } from 'react-dnd'
import { Box, Stack, HStack, VStack, Heading, Text } from '@chakra-ui/react'

interface Mechanism {
	id: string
	name: string
	type: string
	config?: {
		servoPin?: number
		angle?: number
	}
}

const DropArea = ({
	onDrop,
	mechanismsInArea,
	handleEditMechanism,
}: {
	onDrop: (item: Mechanism) => void
	mechanismsInArea: Mechanism[]
	handleEditMechanism: (mechanism: Mechanism) => void
}) => {
	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'MECHANISM',
		drop: (item: Mechanism) => {
			onDrop(item)
		},
		collect: monitor => ({
			isOver: monitor.isOver(),
		}),
	}))

	return (
		<VStack
			ref={drop}
			minH={200}
			w='100%'
			border='2px dashed #ccc'
			p='20px'
			textAlign='center'
			bgColor={isOver ? '#e0ffe0' : '#f9f9f9'}
			borderRadius={5}
		>
			<Heading as='h2' size='xl' color='black'>
				Upuść mechanizm tutaj
			</Heading>
			{mechanismsInArea.map((item: Mechanism) => (
				<Box
					key={item.id}
					border='1px solid #ccc'
					margin='5px'
					padding='10px'
					backgroundColor='#f0f0f0'
					width='150px'
					borderRadius='5px'
					cursor='pointer'
					onClick={() => handleEditMechanism(item)}
				>
					<Heading as='h3' size='lg' color='black'>
						{item.name}
					</Heading>
					{item.type === 'keypad' && (
						<Text as='p' textStyle='sm' color='black'>
							Typ: Klawiatura 4x3
						</Text>
					)}
					{item.type === 'servo' && (
						<Box>
							<Text as='p' textStyle='sm' color='black'>
								Pin serwa: {item.config?.servoPin}
							</Text>
							<Text as='p' textStyle='sm' color='black'>
								Kąt: {item.config?.angle || 'N/A'}
							</Text>
						</Box>
					)}
				</Box>
			))}
		</VStack>
	)
}

export default DropArea