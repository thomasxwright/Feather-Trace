import Order from "./Taxonomies/Order"
// import Order from "./Order"

const BirdsGlossary = ({ cladisticData, setCladisticData }) => {

    const styling = {
        outer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            listStyleType: 'none',
            padding: '0'
        }
    }

    const setGenusData = (order, family, genus, data) => {
        setCladisticData({
            ...cladisticData,
            [order]: {
                ...cladisticData[order],
                [family]: {
                    ...cladisticData[order][family],
                    [genus]: data
                }
            }
        })
    }

    return (
        <ul style={styling.outer}>
            {Object.entries(cladisticData).map(order => {
                return (
                    <li key={order[0]}>
                        <Order orderData={order[1]} orderName={order[0]} setGenusData={setGenusData} />
                    </li>
                )
            })}
        </ul>
    )
}

export default BirdsGlossary