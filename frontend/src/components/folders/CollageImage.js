import { ThemeContext } from '../../utils/ThemeContextManagement'
import { useContext, useState } from 'react'
import { ReactComponent as PhotoIcon } from '../../images/photo.svg'
import { useScreenModeContext } from '../../auth/useScreenMode'

const CollageImage = ({ bird, sighting = null, keyNum, stylingAdjustments }) => {

    const { theme } = useContext(ThemeContext)
    const screenMode = useScreenModeContext()


    const [isHovering, setIsHovering] = useState(false)

    const styling = {
        image: {
            objectFit: 'cover',
            height: '100%',
            width: '100%',
            objectPosition: '50% 15%',
            // pointerEvents: 'none',
            ...theme.dark && { filter: 'brightness(.85) contrast(1.1)' }
        },
        photoIcon: {
            width: '30px',
            height: '30px',
            position: 'absolute',
            bottom: 0,
            left: 0,
            color: 'rgb(255 255 255 / 0.8)',
            margin: '4px',
            pointerEvents: 'auto'
        }
    }
    return (
        <li key={keyNum} style={stylingAdjustments} >
            <img src={bird.image.src} alt={bird.image.alt} style={styling.image} />
            {sighting && isHovering && <img src={sighting} alt='' style={{ ...styling.image, position: 'absolute', top: 0, left: 0 }} />}
            {sighting && <PhotoIcon style={styling.photoIcon} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} />}
        </li>
    )
}

export default CollageImage