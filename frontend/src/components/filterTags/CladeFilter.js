import CladeSelect from './CladeSelect'

const CladeFilter = ({ clade, setClade }) => {
    return (
        <div style={{width: '100%'}}>
            <CladeSelect clade={clade} setClade={setClade}/>
            <input type="text" defaultValue={clade.cladeInput} onChange={e => setClade({...clade, cladeInput: e.target.value})}/>
        </div>
    )
}

export default CladeFilter