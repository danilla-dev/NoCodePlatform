import React, { useState } from 'react'
import { Box, Stack, HStack, VStack, Heading } from '@chakra-ui/react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { v4 as uuidv4 } from 'uuid'
import Draggable from './Draggable'
import DropArea from './DropArea'
import ConfigPopup from './ConfigPopup'

const availableMechanisms = [
	{ id: 'keypad', name: 'Klawiatura 4x3', type: 'keypad' },
	{ id: 'keypad', name: 'Klawiatura 4x3', type: 'keypad' },
	{ id: 'keypad', name: 'Klawiatura 4x3', type: 'keypad' },
	{ id: 'servo', name: 'Serwo', type: 'servo' },
]

const DragAndDropApp = () => {
	interface Mechanism {
		id: string
		name: string
		type: string
		config?: {
			servoPin?: number
			angle?: number
		}
	}

	const [selectedMechanism, setSelectedMechanism] = useState<Mechanism | null>(null)
	const [mechanismsInArea, setMechanismsInArea] = useState<Mechanism[]>([])

	const handleDrop = (item: Mechanism) => {
		const newItem = { ...item, id: uuidv4(), config: {} }
		setMechanismsInArea(prevMechanisms => [...prevMechanisms, newItem])
	}

	const handleEditMechanism = (mechanism: Mechanism) => {
		setSelectedMechanism(mechanism)
	}

	const handleConfirmConfig = (config: { servoPin?: number; angle?: number }) => {
		if (selectedMechanism) {
			setMechanismsInArea(mechanismsInArea.map(item => (item.id === selectedMechanism.id ? { ...item, config } : item)))
		}
		setSelectedMechanism(null)
	}

	const handleDeleteMechanism = (id: string) => {
		setMechanismsInArea(mechanismsInArea.filter(item => item.id !== id))
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<Box className='app-container'>
				<Heading as='h1' size='4xl' textAlign='center' p='0.5em' className='app-heading'>
					Kreator mechanizmów
				</Heading>
				<Stack
					className='main-stack'
					direction={{ base: 'column', md: 'row' }}
					justify='space-between'
					p={{ base: '0 0.5em', md: '0 1em' }}
					h='90vh'
					overflow={{ base: 'auto', md: 'hidden' }}
				>
					<VStack className='available-mechanisms' w={{ base: '100%', md: '20%' }}>
						<Heading as='h2' size='xl'>
							Dostępne mechanizmy
						</Heading>
						<HStack w='100%' p='0.5em' flexWrap='wrap' justify='center'>
							{availableMechanisms.map(item => (
								<Draggable key={item.id} item={item} />
							))}
						</HStack>
					</VStack>
					<Box
						className='drop-area-container'
						w={{ base: '100%', md: '60%' }}
						p='0 1em'
						border='1px solid silver'
						borderTop='none'
						borderBottom='none'
					>
						<DropArea
							onDrop={handleDrop}
							mechanismsInArea={mechanismsInArea}
							handleEditMechanism={handleEditMechanism}
							handleDeleteMechanism={handleDeleteMechanism}
						/>
					</Box>
					{selectedMechanism && (
						<ConfigPopup
							mechanism={selectedMechanism}
							onConfirm={handleConfirmConfig}
							onCancel={() => setSelectedMechanism(null)}
						/>
					)}
				</Stack>
			</Box>
		</DndProvider>
	)
}

export default DragAndDropApp
