const CladeFilterInnards = ( {clade, setClade}) => {
    return (
        <>
            <CladeSelect clade={clade} setClade={setClade} />
            <input type="text" defaultValue={clade.cladeInput} onChange={e => setClade({ ...clade, cladeInput: e.target.value })} />
        </>
    )
}

export default CladeFilterInnards