import { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import TaxonomyNavigation from './TaxonomyNavigation'

const TempFloatingTaxonomyNavigation = ({ taxonomies, setActiveTaxonomy }) => {

    const {theme} = useContext(ThemeContext)
    const styling = {
        backgroundColor: theme.background,
        position: 'sticky',
        zIndex: 2,
        bottom: '0em',
        width: '100%',
        padding: '2px 0 4px'
    }
    return (
        <section style={styling}>
            <TaxonomyNavigation taxonomies={taxonomies} setActiveTaxonomy={setActiveTaxonomy} zIndex={3} stylingAdjustments={{ marginLeft: '0px' }} />
        </section>
    )
}

export default TempFloatingTaxonomyNavigation