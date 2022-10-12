import CladeSelect from './CladeSelect'

const CladeFilter = ({ clade, setClade }) => {
    return (
        <>
            <CladeSelect clade={clade} setClade={setClade}/>
            <input type="text" defaultValue={clade.cladeInput} onChange={e => setClade({...clade, cladeInput: e.target.value})}/>
        </>
    )
}

export default CladeFilter