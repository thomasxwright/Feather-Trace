import { useState, useEffect } from "react"

const BackToTop = () => {

    const [showButton, setShowButton] = useState(false)

    const scrollContainer = () => {
        return document.documentElement || document.body
    }

    const onScroll = () => {
        if (scrollContainer().scrollTop > 3000)
            setShowButton(true)
        else
            setShowButton(false)
    }

    const onClick = () => {
        document.body.scrollIntoView({behavior: 'smooth'})
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
    }, [])

    const styling = {
        position: 'fixed',
        right: '2rem',
        bottom: '2rem',
        borderRadius: '100%',
        padding: '0.5rem',
        border: 'none',
        cursor: 'pointer',
    }

    return showButton ? (
        <button onScroll={onScroll} onClick={onClick} className='back-to-top' style={styling}>Back To Top</button>
    ) : <></>
}

export default BackToTop