import React from 'react'
import RoundedBlock from './RoundedBlock'

const TaxonomyTag = ({ name, color = 'orange' }) => {

  return (
    <RoundedBlock color={color} stylingAdjustments={{borderRadius: '35px'}}>{name}</RoundedBlock>
    // <div style={styling}>{name}</div>
  )
}

export default TaxonomyTag