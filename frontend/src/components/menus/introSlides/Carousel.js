import { useEffect, useState } from 'react'
import './carousel.css'

const Carousel = ({ children }) => {

    //Move to the next slide if you're already mostly there or if your speed is high or if you've already moved most of the way there.

    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)
    const [pos, setPos] = useState(0)

    // const [snapToIndex, setSnapToIndex] = useState(null)
    const [touchStartPosition, setTouchStartPosition] = useState({ pos: 0, time: null })
    const [touchHoldingPosition, setTouchHoldingPosition] = useState([{ pos: 0, time: null }, { pos: 0, time: null }])

    // Set the length to match current children from props
    useEffect(() => {
        setLength(children.length)
    }, [children])

    const next = () => {
        if (currentIndex < (length - 1)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    const handleTouchStart = e => {
        const touchDown = { pos: e.touches[0].clientX, time: e.timeStamp }
        setTouchStartPosition(touchDown)
        setTouchHoldingPosition([touchDown, touchDown])
    }

    const handleTouchMove = (e) => {
        //Find the delta in speed and position, calculate the speed, set snapTo.
        const touchDown = touchStartPosition

        if (touchDown === null) {
            return
        }
        const [dispose, shift] = touchHoldingPosition
        const currentTouch = { pos: e.touches[0].clientX, time: e.timeStamp }
        setTouchHoldingPosition([shift, currentTouch])
    }

    const handleTouchEnd = e => {
        //Find the delta in speed and position, calculate the speed, set snapTo.
        const [older, newer] = touchHoldingPosition
        const endTouch = { pos: e.changedTouches[0].clientX, time: e.timeStamp }
        const deltaPos = endTouch.pos - older.pos
        const deltaTime = (endTouch.time - older.time) / 100
        const speed = deltaPos / deltaTime
        setTouchStartPosition({ pos: 0, time: null })
        setTouchHoldingPosition([{ pos: 0, time: null }, { pos: 0, time: null }])
        const diff = endTouch.pos - touchStartPosition.pos
        if (diff * 2 >= e.target.offsetWidth || speed > 6)
            prev()
        else if (diff * -2 >= e.target.offsetWidth || speed < -6)
            next()
    }

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">

                <div
                    className="carousel-content-wrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="carousel-content"
                        style={{
                            transform: `translateX(  calc( -1 * ${currentIndex * 100}% + ${pos}px - ${touchStartPosition.pos}px + ${touchHoldingPosition[1].pos}px    ))`,
                            ...touchStartPosition.time === null && { transition: 'all 250ms ease-out' }
                        }}
                    >
                        {children}
                    </div>
                </div>

            </div>
            <div>
                {currentIndex > 0 && <button className="left-arrow" onClick={prev}>
                    Back
                </button>
                }
                {currentIndex < length - 1 && <button className="right-arrow" onClick={next}>
                    Next
                </button>
                }
            </div>
        </div>
    )
}

export default Carousel