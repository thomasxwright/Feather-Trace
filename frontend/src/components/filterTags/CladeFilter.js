import CladeSelect from './CladeSelect'

const CladeFilter = ({ clade, setClade, setCladeShown }) => {
    return (
        <div className='filter-tag'>
            <img src={require('../../images/close_FILL0_wght400_GRAD0_opsz48.png')} onClick={() => setCladeShown(false)} />
            <CladeSelect clade={clade} setClade={setClade}/>
            <input type="text" defaultValue={clade.cladeInput} onChange={e => setClade({...clade, cladeInput: e.target.value})}/>
        </div>
    )
}

export default CladeFilter