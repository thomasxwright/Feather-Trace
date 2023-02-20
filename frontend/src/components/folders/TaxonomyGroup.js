import { useContext } from 'react'
import { useScreenModeContext } from '../../auth/useScreenMode'
import Queue from '../../utils/Queue'
import { ThemeContext } from '../../utils/ThemeContextManagement'
// import expandContract from '../../utils/expandContract'
// import TaxonomyNavigation from './TaxonomyNavigation'
import BlockWithNavTags from './BlockWithNavTags'

const TaxonomyGroup = ({ data, taxonomies, setActiveTaxonomy }) => {

    const screenMode = useScreenModeContext()
    const { theme } = useContext(ThemeContext)
    const styling = {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        justifyContent: 'center',
        pointerEvents: 'none',
        // maxWidth: condensedWidth,
        image: {
            height: '90px',
            outline: `4px solid ${theme.previewImageBorders}`,
            // backgroundColor: theme.previewImageBorders,
            margin: '4px 0 0 4px', maxWidth: '105px',
            minWidth: '75px', objectFit: 'cover',
            objectPosition: '50% 25%',
            ...theme.dark && { filter: 'brightness(.85) contrast(1.1)' }
        }
    }

    let total = 0
    const enqueuePhotos = data => {
        if (data._id) {
            total++
            return data.images[0]
        }
        const subItems = Object.values(data)
            .map(subItem => enqueuePhotos(subItem))
        return new Queue(subItems)
    }

    const mineQueueTree = layer => {
        const subItem = layer.dequeue()
        if (!subItem) return undefined
        if (subItem.src) {
            return subItem
        }
        const minedItem = mineQueueTree(subItem)
        if (subItem.length) {
            layer.enqueue(subItem)
        }
        return minedItem
    }

    const queueTree = enqueuePhotos(data)
    const adjustmentKey = {
        narrow: 2.3,
        medium: 1.7,
        desktop: 1
    }
    const adjustment = adjustmentKey[screenMode]
    const multiplier = total <= (15 / adjustment) ? 1 : Math.log(total) / Math.log(7 * adjustment)
    const allowance = Math.floor((15 / adjustment) * multiplier)
    const imageCart = []
    while (imageCart.length < allowance && queueTree.length) {
        const nextImage = mineQueueTree(queueTree)
        imageCart.push(nextImage)
    }
    const counts = {
        total,
        plusMore: allowance < total ? total - allowance : 0
    }

    return (

        <BlockWithNavTags taxonomies={taxonomies} setActiveTaxonomy={setActiveTaxonomy} counts={counts}>
            <ul style={styling}>
                {imageCart.map((image, i) => (
                    image && <li key={i}>
                        <img src={image.src} alt={image.alt} style={{ ...styling.image }} />
                    </li>
                )
                )}
            </ul>
        </BlockWithNavTags>
    )
}

export default TaxonomyGroup