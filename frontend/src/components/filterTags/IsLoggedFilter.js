const IsLoggedFilter = ({ isLogged, setIsLogged }) => {

    const styling = {
        height: '100%',
        margin: '2px 8px',
    }
    return (
        <>
            Birds I
            <select name="isLogged" style={styling} defaultValue={isLogged} onChange={e => setIsLogged(e.target.value)}>
                <option value={null} >have/haven't</option>
                <option value={true} >have</option>
                <option value={false} >haven't</option>
            </select >
            logged
            {/* <input type="checkbox" defaultValue={isLogged} onChange={e => setIsLogged( isLogged)} /> */}
        </>
    )
}

export default IsLoggedFilter