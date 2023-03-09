import { useContext } from "react"
import { ThemeContext } from "../../utils/ThemeContextManagement"

const BirdPhoto = ({ img, myPhoto = null }) => {

    const { theme } = useContext(ThemeContext)

    const styling = {
        main: {
            width: '100%',
            display: 'block',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%,rgba(0,0,0,1) 20%)',
            ...theme.dark && { filter: 'brightness(.85) contrast(1.1)' }
        },
        overlay: {
            // backgroundImage: 'linear-gradient(to top, rgba(255,255,255, 0.8) 0%,rgba(0,0,0,0) 20%)',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '0'
        }
    }

    return (
        <>
            <img src={img.src} alt={img.alt} style={styling.main} />
            {/* <div style={styling.overlay}></div> */}
        </>
    )
}

export default BirdPhoto