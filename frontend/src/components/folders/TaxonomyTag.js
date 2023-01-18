import React from 'react'
import RoundedBlock from './RoundedBlock'

const TaxonomyTag = ({ taxonomy, color = 'orange', stylingAdjustments = {}, setActiveTaxonomy }) => {

  const [currentLevel, taxonomyName] = taxonomy

  return (
    <div onClick={setActiveTaxonomy}>
      <RoundedBlock color={color} stylingAdjustments={{ ...stylingAdjustments, borderRadius: '35px', cursor: 'pointer' }} >
        {taxonomyName}
      </RoundedBlock>
    </div>
  )
}

export default TaxonomyTag