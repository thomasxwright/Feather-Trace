const CladeSelect = ({ clade, setClade }) => {
    return (
        <select name="clades" defaultValue={clade.cladeType} onChange={e => setClade({...clade, cladeType: e.target.value})}>
            <option value="" >(Select a taxonomy)</option>
            <option value="order" >Order</option>
            <option value="family" >Family</option>
            <option value="genus" >Genus</option>
        </select >
    )
}

export default CladeSelect