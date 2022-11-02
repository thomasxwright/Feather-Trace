import { useEffect, useState } from 'react';

export const useMediaQuery = (queries) => {
    const mediaMatches = queries.map(query => {
        return {
            mode: query.mode,
            mediaMatch: window.matchMedia(query.query)
        }
    })
    const findMatchedScreenMode = () => mediaMatches.find(monitor => monitor.mediaMatch.matches).mode
    const [screenMode, setScreenMode] = useState(findMatchedScreenMode())

    useEffect(() => {
        const handler = e => {
            if (!e.matches) return
            const mode = findMatchedScreenMode()
            setScreenMode(mode)
        }
        mediaMatches.forEach(mode => mode.mediaMatch.addEventListener('change', handler))
        return () => mediaMatches.forEach(mode => mode.mediaMatch.removeEventListener('change', handler))
    }, [])      // does the empty dependency array need to be here? if useEffect is retriggered, it first cleans up the old listeners anyway.
    return screenMode
}