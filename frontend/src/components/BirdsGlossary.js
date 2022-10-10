import Order from "./Order"

const BirdsGlossary = ({ cladisticData }) => {

    const styling = {
        outer: {
            display: 'flex',
            flexDirection: 'column',
            listStyleType: 'none'
        }
    }

    return (
        <ul style={styling.outer}>
            {Object.entries(cladisticData).map(order => {
                return (
                    <li key={order[0]}>
                        <Order orderData={order[1]} orderName={order[0]} />
                    </li>
                )
            })}
        </ul>
    )
}

export default BirdsGlossary