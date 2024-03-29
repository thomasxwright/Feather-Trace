import { useContext } from 'react'
import { useScreenModeContext } from '../../utils/useScreenMode'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import RoundedBlock from '../RoundedBlock'
import TaxonomyTag from '../navigation/TaxonomyTag'
import { motion } from 'framer-motion'

const BlockWithNavTags = ({ taxonomies = {}, children, setActiveTaxonomy, stylingAdjustments = {}, images, i }) => {

    const screenMode = useScreenModeContext()
    const { theme } = useContext(ThemeContext)
    const { plusMore, birdTotal } = images

    const styling = {
        cursor: 'pointer',
        position: 'relative',
        containerResponsive: {
            narrow: {
                padding: '16px 12px'
            }
        },
        total: {
            position: 'absolute',
            width: screenMode !== 'narrow' ? '70px' : '50px',
            height: screenMode !== 'narrow' ? '80px' : '75px',
            top: '0',
            right: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0 0 0 8px',
            backdropFilter: 'blur(3px)',
            backgroundColor: 'rgb(0 0 0 / 0.35)'
        },
        totalNumeral: {
            fontSize: screenMode !== 'narrow' ? '2em' : '1.5em',
            color: theme.dark ? theme.text : 'white',
            marginTop: '-6px',
            padding: '0px'
        }
    }


    const taxonomyList = Object.entries(taxonomies) // !!! TODO: -- proper order isn't guaranteed.
    const innermostTaxonomy = taxonomyList[taxonomyList.length - 1]
    const [innermostLevel, innermostName] = innermostTaxonomy
    const color = theme.taxonomies[innermostLevel]
    const overlayColor = theme.dark === true ? '18 18 18' : '255 255 255'

    const handleClick = () => setActiveTaxonomy[innermostLevel](innermostName)

    return (
        <motion.section
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .4, delay: 0.03 * i}}>
            {/* <TaxonomyNavigation taxonomies={taxonomyList} zIndex={2} setActiveTaxonomy={setActiveTaxonomy} stylingAdjustments={{ marginBottom: '-8px' }} /> */}

            <TaxonomyTag taxonomy={innermostTaxonomy} setActiveTaxonomy={() => setActiveTaxonomy[innermostTaxonomy[0]](innermostTaxonomy[1])} stylingAdjustments={{ backgroundColor: theme.taxonomies[innermostTaxonomy[0]], marginLeft: '4px', marginBottom: '-8px' }} />
            <RoundedBlock
                stylingAdjustments={{ ...stylingAdjustments, zIndex: 3, ...styling, ...styling.containerResponsive[screenMode], overflow: 'hidden', backgroundColor: color }}
                handleClick={handleClick}
            >
                {children}

                {(plusMore > 0 || birdTotal > 9) && (birdTotal > 1) && <div style={styling.total}>
                    <span style={styling.totalNumeral}>
                        {birdTotal}
                    </span>
                    <span style={{ fontSize: '0.75em', color: theme.dark ? theme.text : 'white' }}>
                        bird{birdTotal !== 1 && 's'}
                    </span>
                    <span style={{ fontSize: '0.75em', color: theme.dark ? theme.text : 'white' }}>
                        inside
                    </span>
                </div>
                }
            </RoundedBlock>
        </motion.section >
    )
}

export default BlockWithNavTags