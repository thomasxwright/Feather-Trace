import React from 'react'
import TaxonomyTag from './TaxonomyTag'

const TaxonomyNavigation = ({ taxonomies, zIndex, setActiveTaxonomy }) => {

  const baseZIndex = taxonomies.order ? 2 : 0
  const innermostTaxonomy = taxonomies[taxonomies.length - 1]
  const styling = {
    marginLeft: '4px',
    marginBottom: '-12px',
    display: 'flex',
    listStyle: 'none',
    zIndex: zIndex,
    position: 'relative'
  }

  const colors = {
    order: 'rgb(180, 167, 197)',
    family: 'rgb(194, 196, 216)',
    genus: 'rgb(217, 230, 234)',
    species: 'white'
  }

  return (
    //The marginTop property pushes down the inner content of the roundedBox. Fix this at some point.
    <ul style={styling}>
      {taxonomies.slice(0, taxonomies.length - 1).map((taxonomy, i) => (
        <li key={i}>
          <TaxonomyTag
            taxonomy={taxonomy}
            color={colors[taxonomy[0]]}
            stylingAdjustments={{ marginRight: '-28px', marginTop: '8px', paddingRight: '35px' }}
            setActiveTaxonomy={() => setActiveTaxonomy[taxonomy[0]](taxonomy[1])}
          />
        </li>
      ))}
      {
        taxonomies.length > 0 &&
        <li key={taxonomies.length - 1}>
          <TaxonomyTag
            taxonomy={taxonomies[taxonomies.length - 1]}
            color={colors[taxonomies[taxonomies.length - 1][0]]}
            setActiveTaxonomy={zIndex === 0 ? () => setActiveTaxonomy.stepOutOneLevel() : () => setActiveTaxonomy[innermostTaxonomy[0]](innermostTaxonomy[1])}
          />
        </li>
      }
    </ul>
  )
}

export default TaxonomyNavigation