import React from 'react'
import TaxonomyTag from './TaxonomyTag'

const TaxonomyNavigation = ({ taxonomies, color }) => {
  const styling = {
    marginLeft: '4px',
    marginBottom: '-4px',
    display: 'flex',
    listStyle: 'none'
  }
  
  return (
    // <div>{taxonomies[0]}</div>
    <ul style={styling}>
      {taxonomies.map((taxonomy, i) => (
        <li key={i}>
          <TaxonomyTag name={taxonomy} color={color} />
        </li>
      ))}
    </ul>
  )
}

export default TaxonomyNavigation