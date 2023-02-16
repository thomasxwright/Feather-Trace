import { createContext, useState } from 'react'
import themes from "./themes"

const calculateThemeName = () => {
    const browserMode = {
        dark: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
        light: window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    }
    const mode = browserMode.dark ? 'dark' :
        (browserMode.light ? 'light' : '')
    const storedTheme = localStorage.getItem('theme')
    return (themes[storedTheme] && storedTheme)  || (mode === 'dark' ? 'Apple' : 'Periwinkle')
}

export const ThemeContext = createContext({
    theme: {},
    themeName: 'Periwinkle',
    setTheme: () => { }
})

export const ThemeContextProvider = ({ children }) => {

    const setTheme = themeName => {
        localStorage.setItem('theme', themeName)
        const theme = themes[themeName]
        setState({ ...state, theme: theme, themeName: themeName })
    }

    const themeName = calculateThemeName()
    const theme = themes[themeName]


    const [state, setState] = useState({ theme, themeName, setTheme })

    return (
        <ThemeContext.Provider value={state}>
            {children}
        </ThemeContext.Provider>
    )
}

/*https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
Used Matteen Kiani's answer to set this up.


To watch for dark mode changes:

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme = e.matches ? "dark" : "light";
})

https://stackoverflow.com/questions/50840168/how-to-detect-if-the-os-is-in-dark-mode-in-browsers
*/