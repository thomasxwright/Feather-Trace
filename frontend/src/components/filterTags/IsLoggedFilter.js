const IsLoggedFilter = ({ isLogged, setIsLogged }) => {
    return (
        <>
            <select name="isLogged" defaultValue={true} onChange={e => setIsLogged(e.target.value)}>
                <option value={true} >Logged species</option>
                <option value={false} >Unlogged species</option>
            </select >
            {/* <input type="checkbox" defaultValue={isLogged} onChange={e => setIsLogged( isLogged)} /> */}
        </>
    )
}

export default IsLoggedFilter