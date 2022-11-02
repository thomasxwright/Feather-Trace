import * as React from 'react'
import { useMediaQuery } from '../components/useMediaQuery'
import mediaMatches from '../utils/defaultScreenModes'

const screenModeContext = React.createContext()

export function useScreenModeContext() {
	return React.useContext(screenModeContext)
}

export function ScreenModeProvider({ children }) {
	const mode = useMediaQuery(mediaMatches)

	return <screenModeContext.Provider value={mode}>
		{children}
	</screenModeContext.Provider>
}