import Bird from "./Bird"

const BirdsGlossary = ({ birds }) => {

    const styling = {
        bird: {
            margin: '15px 0',
            padding: '20px',
            listStyle: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'rgb(235, 219, 249)'
        },
        outer: {
            display: 'flex',
            flexDirection: 'column',
        }
    }

    return (
        <ul style={styling.outer}>
            {birds.map(bird => {
                return (
                    <li style={styling.bird} key={bird._id}>
                        <Bird bird={bird} />
                    </li>
                )
            })}
        </ul>
    )
}

export default BirdsGlossary