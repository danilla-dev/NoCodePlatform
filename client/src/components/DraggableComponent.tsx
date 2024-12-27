import React from 'react'
import { useDrag } from 'react-dnd'

interface DraggableComponentProps {
	id: string
	type?: string
	content: string
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ id, type, content }) => {
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: 'ITEM', // Określamy typ przeciąganego elementu
			item: { id, type, content }, // Dane przesyłane z kafelkiem
			collect: monitor => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[id]
	)

	return (
		<div
			ref={drag}
			style={{
				padding: '20px',
				backgroundColor: isDragging ? 'lightgray' : 'white',
				border: '1px solid black',
				borderRadius: '8px',
				cursor: 'move',
				margin: '10px',
			}}
		>
			{content}
		</div>
	)
}

export default DraggableComponent
