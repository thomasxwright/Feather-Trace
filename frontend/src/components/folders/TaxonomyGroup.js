import { useContext } from 'react'
import { useScreenModeContext } from '../../auth/useScreenMode'
import selectImages from '../../utils/selectImages'
import { ThemeContext } from '../../utils/ThemeContextManagement'
// import expandContract from '../../utils/expandContract'
// import TaxonomyNavigation from './TaxonomyNavigation'
import BlockWithNavTags from './BlockWithNavTags'

const TaxonomyGroup = ({ data, taxonomies, setActiveTaxonomy }) => {

    const screenMode = useScreenModeContext()
    const { theme } = useContext(ThemeContext)

    const images = selectImages(data, screenMode)
    const { imageCart, plusMore } = images
    const totalSquares = imageCart.length + (plusMore ? 1 : 0)

    const styling = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        listStyle: 'none',
        justifyContent: 'center',
        pointerEvents: 'none',
        li: {
            height: '90px',
            outline: `4px solid ${theme.previewImageBorders}`,
            // backgroundColor: theme.previewImageBorders,
            flexGrow: '1',
            ...totalSquares > 1 && { maxWidth: screenMode !== 'narrow' ? '135px' : 'calc(50% - 8px)' },
            minWidth: '85px'
        },
        image: {
            objectFit: 'cover',
            height: '100%',
            width: '100%',
            objectPosition: '50% 15%',
            ...theme.dark && { filter: 'brightness(.85) contrast(1.1)' }
        },
        extraBlock: {
            background: `linear-gradient(217deg, rgba(105, 101, 116, 0.66), rgba(31, 38, 62, 0) 70.71%), linear-gradient(127deg, rgba(77, 94, 98, 0.25), rgba(55, 69, 72, 0) 70.71%), rgb(180, 167, 197) linear-gradient(336deg, rgba(78, 71, 95, 0.25), rgba(43, 45, 67, 0) 70.71%)`,
            backgroundColor: theme.taxonomies.order,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
        },
        plusMore: {
            fontSize: '1.5em',
            marginTop: '-4px'
        }
    }


    return (


        <BlockWithNavTags taxonomies={taxonomies} setActiveTaxonomy={setActiveTaxonomy} images={images}>
            <ul style={styling}>
                {imageCart.map((image, i) => (
                    image && <li key={i} style={styling.li}>
                        <img src={image.src} alt={image.alt} style={styling.image} />
                    </li>
                )
                )}
                {plusMore > 0 && <li key={imageCart.length} style={{...styling.li, flexGrow: '1'}}>
                    <div style={{
                        ...styling.extraBlock, color: theme.dark ? 'rgb(255 255 255 / 0.8)' : 'white'
                    }}>
                        <span style={styling.plusMore}>
                            +{plusMore}
                        </span>
                        <span style={{ fontSize: '0.75em' }}>
                            more
                        </span>
                    </div>
                </li>
                }
            </ul>
        </BlockWithNavTags>
    )
}

export default TaxonomyGroup