import Bird from "./Bird"

const Genus = ({ genusData, genusName }) => {

    const styling = {
        bird: {
            margin: '15px 0',
            padding: '20px',
            listStyle: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'rgb(235, 219, 249)'
        }
    }

    return (
        <ul className="genus">
            <span>{genusName}</span>
            {Object.entries(genusData).map(species => {
                return (
                    <li key={species[1]._id}>
                        <Bird bird={species[1]} />
                    </li>
                )
            })}
        </ul>
    )
}

export default Genus