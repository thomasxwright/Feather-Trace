import Family from "./Family"

const Order = ({ orderData, orderName }) => {
    return (
        <ul className="order">
            <span>{orderName}</span>
            {Object.entries(orderData).map(family => {
                return (
                    <li key={family[0]}>
                        <Family familyData={family[1]} familyName={family[0]} />
                    </li>
                )
            })}
        </ul>
    )
}

export default Order