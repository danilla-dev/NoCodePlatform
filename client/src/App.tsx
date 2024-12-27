import React from 'react'
import { Text } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { Provider as ChakraProvider } from './components/ui/provider'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DraggableComponent from './components/DraggableComponent'
import DropZone from './components/DropZone'
import DragAndDropApp from './components/DragAndDropApp'

const App = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<ChakraProvider>
				<DragAndDropApp />
			</ChakraProvider>
		</DndProvider>
	)
}

export default App
