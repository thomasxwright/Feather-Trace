import RoundedBlock from './RoundedBlock'

const TaxonomyTag = ({ taxonomy, stylingAdjustments = {}, setActiveTaxonomy }) => {

  const [currentLevel, taxonomyName] = taxonomy

  const boostedAdjustments = {
    borderRadius: '29px',
    cursor: 'pointer',
    padding: '0px 18px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    ...stylingAdjustments
  }

  return (
    <div>
      <RoundedBlock stylingAdjustments={boostedAdjustments} handleClick={setActiveTaxonomy} >
        {taxonomyName}
      </RoundedBlock>
    </div>
  )
}

export default TaxonomyTag