import React, { useState } from 'react'
import { Box, Stack, HStack, VStack, Heading, Text, Button, Group, Input, Fieldset } from '@chakra-ui/react'
import { Field } from './ui/field.tsx'

interface Mechanism {
	id: string
	name: string
	type: string
	config?: {
		servoPin?: number
		angle?: number
		keypadRowsPins?: number[]
		keypadColsPins?: number[]
	}
}

const ConfigPopup = ({
	mechanism,
	onConfirm,
	onCancel,
}: {
	mechanism: Mechanism
	onConfirm: (config: any) => void
	onCancel: () => void
}) => {
	const [servoPin, setServoPin] = useState(mechanism.config?.servoPin || 9)
	const [angle, setAngle] = useState(mechanism.config?.angle || 0)
	const [keypadRowsPins, setKeypadRowsPins] = useState<number[]>(mechanism.config?.keypadRowsPins || [])
	const [keypadColsPins, setKeypadColsPins] = useState<number[]>(mechanism.config?.keypadColsPins || [])

	const handleConfirm = () => {
		if (mechanism.type === 'servo') {
			onConfirm({ servoPin, angle })
		} else if (mechanism.type === 'keypad') {
			onConfirm({ keypadRowsPins, keypadColsPins })
		}
	}

	const renderInput = (label: string, value: number, setValue: React.Dispatch<React.SetStateAction<number>>) => (
		<Box>
			<Field label={label}>
				<Input
					type='number'
					variant='flushed'
					value={value}
					onChange={e => setValue(parseInt(e.target.value))}
					size='xs'
				/>
			</Field>
		</Box>
	)

	const renderKeypadInputs = () => (
		<Stack direction={{ base: 'row', md: 'column' }} w='100%' flexWrap='wrap'>
			{[...Array(4)].map((_, i) => (
				<Box key={`row-${i}`} maxW={{ base: '20%', md: '100%' }}>
					<Field label={`Wiersz ${i + 1}:`}>
						<Input
							type='number'
							variant='flushed'
							value={keypadRowsPins[i] || ''}
							onChange={e => {
								const newPins = [...keypadRowsPins]
								newPins[i] = parseInt(e.target.value)
								setKeypadRowsPins(newPins)
							}}
							size='xs'
						/>
					</Field>
				</Box>
			))}
			{[...Array(3)].map((_, i) => (
				<Box key={`col-${i}`} maxW={{ base: '20%', md: '100%' }}>
					<Field label={`Kolumna ${i + 1}:`}>
						<Input
							type='number'
							variant='flushed'
							value={keypadColsPins[i] || ''}
							onChange={e => {
								const newPins = [...keypadColsPins]
								newPins[i] = parseInt(e.target.value)
								setKeypadColsPins(newPins)
							}}
							size='xs'
						/>
					</Field>
				</Box>
			))}
		</Stack>
	)

	return (
		<VStack className='popup' maxH='80vh' overflowY='auto' w={{ base: '100%', md: '20%' }} p='0 1em'>
			<Heading as='h2' size='xl'>
				{mechanism.name} - Ustawienia
			</Heading>
			<HStack w='100%' p='0.5em' flexWrap='wrap'>
				{mechanism.type === 'servo' && (
					<Box>
						{renderInput('Pin serwa', servoPin, setServoPin)}
						{renderInput('Kąt serwa', angle, setAngle)}
					</Box>
				)}
				{mechanism.type === 'keypad' && renderKeypadInputs()}
			</HStack>
			<Group w='100%'>
				<Button p='1em 0.5em' onClick={handleConfirm}>
					Zatwierdź
				</Button>
				<Button p='1em 0.5em' onClick={onCancel}>
					Anuluj
				</Button>
			</Group>
		</VStack>
	)
}

export default ConfigPopup
