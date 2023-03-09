import { createContext, useContext } from 'react'
import { useMediaQuery } from './useMediaQuery'
import mediaMatches from '../utils/defaultScreenModes'

const screenModeContext = createContext()

export function useScreenModeContext() {
	return useContext(screenModeContext)
}

export function ScreenModeProvider({ children }) {
	const mode = useMediaQuery(mediaMatches)

	return <screenModeContext.Provider value={mode}>
		{children}
	</screenModeContext.Provider>
}