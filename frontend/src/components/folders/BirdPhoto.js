import { useContext } from "react"
import { ThemeContext } from "../../utils/ThemeContextManagement"

const BirdPhoto = ({ img }) => {

    const { theme } = useContext(ThemeContext)

    const styling = {
        borderRadius: '6px',
        width: '100%',
        zIndex: '1',
        position: 'relative',
        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%,rgba(0,0,0,1) 20%)',
        ...theme.dark && { filter: 'brightness(.85) contrast(1.1)' }
    }

    return (
        <img src={img.src} alt={img.alt} style={styling} />
    )
}

export default BirdPhoto