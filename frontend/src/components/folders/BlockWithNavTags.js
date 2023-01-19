import React from 'react'
import RoundedBlock from './RoundedBlock'
import TaxonomyNavigation from './TaxonomyNavigation'

const BlockWithNavTags = ({ taxonomies = {}, children, setActiveTaxonomy, stylingAdjustments = {} }, expandable = true) => {

    const colors = {
        order: 'rgb(180, 167, 197)',
        family: 'rgb(194, 196, 216)',
        genus: 'rgb(217, 230, 234)',
        species: 'white'
    }

    const zIndex = taxonomies.order ? 0 : 2

    const taxonomyList = Object.entries(taxonomies) // !!! -- proper order isn't guaranteed.
    const innermostTaxonomy = taxonomyList[taxonomyList.length - 1]
    const [innermostLevel, innermostName] = innermostTaxonomy
    const color = colors[innermostLevel]

    /*
    Navigation segment
        list of clickable taxonomies
    block
        children
    */
    return (
        <section>
            <TaxonomyNavigation taxonomies={taxonomyList} zIndex={2} setActiveTaxonomy={setActiveTaxonomy} />
            {/* FIX: Problem with this block is the clickable part doesn't follow the shape of the roundedblock inside. */}
            <div onClick={() => setActiveTaxonomy[innermostLevel](innermostName)} style={{cursor: 'pointer'}}>
                <RoundedBlock
                    color={color}
                    stylingAdjustments={{ ...stylingAdjustments, zIndex: 3 }}
                >
                    {children}
                </RoundedBlock>
            </div>
        </section>
    )
}

export default BlockWithNavTags