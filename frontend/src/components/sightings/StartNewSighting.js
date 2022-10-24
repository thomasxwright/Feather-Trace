import add from "../../images/add new.svg"
const StartNewSighting = ({ showForm }) => {

    const styling = {
        outer: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
        },
        large: {
            fontSize: '160%',
            fontWeight: 'bold'
        },
        icon: {
            margin: '40px'
        }
    }
    return (
        <div style={styling.outer} onClick={() => showForm(true)}>
            <img src={add} style={styling.icon} />
            <span style={styling.large}>Add new sighting</span>
        </div>
    )
}

export default StartNewSighting