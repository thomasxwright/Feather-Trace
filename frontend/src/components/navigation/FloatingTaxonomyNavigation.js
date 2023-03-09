import TaxonomyNavigation from "./TaxonomyNavigation"

const FloatingTaxonomyNavigation = ({ taxonomies, setActiveTaxonomy }) => {

    const styling = {
        position: 'fixed',
        top: '0rem',
        padding: '0.5rem',
        backgroundColor: 'white',
        border: 'none',
        zIndex: 4
    }

    return (
        <section style={styling}>
            <TaxonomyNavigation taxonomies={taxonomies} zIndex={4} setActiveTaxonomy={setActiveTaxonomy} />
        </section>
    )
}

export default FloatingTaxonomyNavigation