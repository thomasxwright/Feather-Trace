import { ThemeContext } from '../../utils/ThemeContextManagement'
import { useContext, useState } from 'react'
import { ReactComponent as PhotoIcon } from '../../images/photo.svg'
import {motion} from 'framer-motion'

const CollageImage = ({ bird, sighting = null, stylingAdjustments, i }) => {

    const { theme } = useContext(ThemeContext)

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
        <motion.li style={stylingAdjustments}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.15, delay: 0.012*i}}>
            <img src={bird.image.src} alt={bird.image.alt} style={styling.image} />
            {sighting && isHovering && <img src={sighting} alt='' style={{ ...styling.image, position: 'absolute', top: 0, left: 0 }} />}
            {sighting && <PhotoIcon style={styling.photoIcon} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} />}
        </motion.li>
    )
}

export default CollageImage