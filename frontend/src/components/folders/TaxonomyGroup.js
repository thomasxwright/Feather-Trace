import { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeContextManagement'
// import expandContract from '../../utils/expandContract'
// import TaxonomyNavigation from './TaxonomyNavigation'
import BlockWithNavTags from './BlockWithNavTags'

const TaxonomyGroup = ({ data, taxonomies, setActiveTaxonomy }) => {

    const { theme } = useContext(ThemeContext)
    const styling = {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        justifyContent: 'center',
        pointerEvents: 'none'
        // maxWidth: condensedWidth,
    }

    const getSubContent = obj => {
        if (obj.images) return obj
        return getSubContent(getSubItem(obj))
    }
    const getSubItem = obj => {
        let subItem
        for (subItem in obj) break
        return obj[subItem]
    }
    // get one image for each subgroup.
    const images = []

    // Placeholder for special bird component: Actually, a taxonomygroup wouldn't even be rendered here. Instead, a BirdCard would be here.
    if (data._id) { images.push(data.images[0]) }
    else {
        for (const item in data) {
            images.push(getSubContent(data[item]).images[0])
        }
    }
    const condensedWidth = '9000px'


    return (

        <BlockWithNavTags taxonomies={taxonomies} setActiveTaxonomy={setActiveTaxonomy}>
            <ul style={styling}>
                {images.map((image, i) => (
                    image && <li key={i}>
                        <img src={image.src} alt={image.alt} style={{ height: '90px', outline: `4px solid ${theme.previewImageBorders}`, margin: '4px 0 0 4px', maxWidth: '105px', minWidth: '75px', objectFit: 'cover', objectPosition: '50% 25%' }} />
                    </li>
                )
                )}
            </ul>
        </BlockWithNavTags>
    )
}

export default TaxonomyGroup