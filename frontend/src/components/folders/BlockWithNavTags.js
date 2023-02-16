import { useContext } from 'react'
import { useScreenModeContext } from '../../auth/useScreenMode'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import RoundedBlock from './RoundedBlock'
import TaxonomyNavigation from './TaxonomyNavigation'

const BlockWithNavTags = ({ taxonomies = {}, children, setActiveTaxonomy, stylingAdjustments = {} }, expandable = true) => {

    const screenMode = useScreenModeContext()
    const { theme } = useContext(ThemeContext)

    const styling = {
        containerResponsive: {
            narrow: {
                padding: '16px 12px 16px 8px'
            }
        }
    }

    const zIndex = taxonomies.order ? 0 : 2

    const taxonomyList = Object.entries(taxonomies) // !!! -- proper order isn't guaranteed.
    const innermostTaxonomy = taxonomyList[taxonomyList.length - 1]
    const [innermostLevel, innermostName] = innermostTaxonomy
    const color = theme.taxonomies[innermostLevel]

    /*
    Navigation segment
        list of clickable taxonomies
    block
        children
    */
    return (
        <section>
            <TaxonomyNavigation taxonomies={taxonomyList} zIndex={2} setActiveTaxonomy={setActiveTaxonomy} stylingAdjustments={{marginBottom: '-8px'}} />
            {/* FIX: Problem with this block is the clickable part doesn't follow the shape of the roundedblock inside. */}
            <div onClick={() => setActiveTaxonomy[innermostLevel](innermostName)} style={{ cursor: 'pointer' }}>
                <RoundedBlock
                    color={color}
                    stylingAdjustments={{ ...stylingAdjustments, zIndex: 3, ...styling.containerResponsive[screenMode] }}
                >
                    {children}
                </RoundedBlock>
            </div>
        </section>
    )
}

export default BlockWithNavTags