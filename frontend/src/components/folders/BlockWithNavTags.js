import React from 'react'
import RoundedBlock from './RoundedBlock'
import TaxonomyNavigation from './TaxonomyNavigation'

const BlockWithNavTags = ({ taxonomies = [], children, color = 'yellow' }) => {

    /*
    Navigation segment
        list of clickable taxonomies
    block
        children
    */
    return taxonomies.length ? (
        <section>
            <TaxonomyNavigation taxonomies={taxonomies} color={color}/>
            <RoundedBlock color={color}>
                {children}
            </RoundedBlock>
        </section>
    )
    :
    <section>
        {children}
    </section>
}

export default BlockWithNavTags