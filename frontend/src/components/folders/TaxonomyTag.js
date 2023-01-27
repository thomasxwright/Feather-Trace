import React from 'react'
import RoundedBlock from './RoundedBlock'

const TaxonomyTag = ({ taxonomy, color = 'orange', stylingAdjustments = {}, setActiveTaxonomy, boostedTag = false }) => {

  const [currentLevel, taxonomyName] = taxonomy

  const boostedAdjustments = {
    borderRadius: '29px',
    cursor: 'pointer',
  }

  return (
    <div onClick={setActiveTaxonomy}>
      <RoundedBlock color={color} stylingAdjustments={{ ...stylingAdjustments, ...boostedAdjustments }} boostedTag={boostedTag} >
        {taxonomyName}
      </RoundedBlock>
    </div>
  )
}

export default TaxonomyTag