import { useContext } from 'react'
import { useScreenModeContext } from '../../auth/useScreenMode'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import RoundedBlock from './RoundedBlock'
import TaxonomyNavigation from './TaxonomyNavigation'

const BlockWithNavTags = ({ taxonomies = {}, children, setActiveTaxonomy, stylingAdjustments = {}, plusMore }) => {

    const screenMode = useScreenModeContext()
    const { theme } = useContext(ThemeContext)

    const styling = {
        cursor: 'pointer',
        position: 'relative',
        containerResponsive: {
            narrow: {
                padding: '16px 12px 16px 8px'
            }
        }
    }

    const taxonomyList = Object.entries(taxonomies) // !!! TODO: -- proper order isn't guaranteed.
    const innermostTaxonomy = taxonomyList[taxonomyList.length - 1]
    const [innermostLevel, innermostName] = innermostTaxonomy
    const color = theme.taxonomies[innermostLevel]
    const overlayColor = theme.dark === true ? '18 18 18' : '255 255 255'

    const handleClick = () => setActiveTaxonomy[innermostLevel](innermostName)

    return (
        <section>
            <TaxonomyNavigation taxonomies={taxonomyList} zIndex={2} setActiveTaxonomy={setActiveTaxonomy} stylingAdjustments={{ marginBottom: '-8px' }} />
            {/* TODO: Problem with this block is the clickable part doesn't follow the shape of the roundedblock inside. */}
            <RoundedBlock
                color={color}
                stylingAdjustments={{ ...stylingAdjustments, zIndex: 3, ...styling, ...styling.containerResponsive[screenMode], overflow: 'hidden' }}
                handleClick={handleClick}
            >
                {children}

                {plusMore > 0 && <div style={{
                    position: 'absolute',
                    width: '90px',
                    height: '90px',
                    bottom: '0px',
                    right: '0px',
                    zIndex: 4,
                    display: 'flex',
                    alignItems: 'flex-end',
                    background: `linear-gradient(to top left, rgb(${overlayColor} / .8) 35%, rgb(${overlayColor} / .35) 40%, rgb(${overlayColor} / 0) 50%)`,
                }}>
                    <span style={{ color: theme.text, position: 'absolute', right: '0px', bottom: '0px', margin: '12px', fontSize: '2em', opacity: '70%' }}>
                        +{plusMore}
                    </span>
                </div>}
            </RoundedBlock>
        </section >
    )
}

export default BlockWithNavTags