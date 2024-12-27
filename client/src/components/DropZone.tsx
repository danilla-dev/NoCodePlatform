import React from 'react'
import { useDrop } from 'react-dnd'

interface DropZoneProps {
	type: string
	title: string
}

const DropZone: React.FC<DropZoneProps> = ({ type, title }) => {
	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: 'ITEM', // Akceptujemy przeciągane kafelki
			drop: (item: any) => {
				console.log(`Kafelka ${item.content} upuszczono w kolumnie ${title}`)
				generateArduinoCode(item, type)
			},
			collect: monitor => ({
				isOver: monitor.isOver(),
			}),
		}),
		[]
	)

	const generateArduinoCode = (item: any, zoneType: string) => {
		// Prosty kod generujący kod Arduino w zależności od typu kafelka
		let code = ''
		if (zoneType === 'setup') {
			if (item.type === 'LED') {
				code = 'pinMode(13, OUTPUT); // LED Setup'
			} else if (item.type === 'Button') {
				code = 'pinMode(2, INPUT); // Button Setup'
			} else if (item.type === 'Sensor') {
				code = 'pinMode(A0, INPUT); // Sensor Setup'
			}
		} else if (zoneType === 'loop') {
			if (item.type === 'LED') {
				code = 'digitalWrite(13, HIGH); // LED Loop'
			} else if (item.type === 'Button') {
				code = 'int buttonState = digitalRead(2); // Button Loop'
			} else if (item.type === 'Sensor') {
				code = 'int sensorValue = analogRead(A0); // Sensor Loop'
			}
		}
		console.log(code)
	}

	return (
		<div
			ref={drop}
			style={{
				width: '200px',
				height: '200px',
				backgroundColor: isOver ? 'lightgreen' : 'lightgray',
				padding: '10px',
				margin: '10px',
				borderRadius: '8px',
				textAlign: 'center',
			}}
		>
			{title}
		</div>
	)
}

export default DropZone
