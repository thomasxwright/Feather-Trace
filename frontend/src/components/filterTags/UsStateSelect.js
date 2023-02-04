const UsStateSelect = ({ place, setPlace }) => {
    const states = {
        AL: 'Alabama',
        AK: 'Alaska',
        AZ: 'Arizona',
        AR: 'Arkansas',
        CA: 'California',
        CO: 'Colorado',
        CT: 'Connecticut',
        DE: 'Delaware',
        FL: 'Florida',
        GA: 'Georgia',
        HI: 'Hawaii',
        ID: 'Idaho',
        IL: 'Illinois',
        IN: 'Indiana',
        IA: 'Iowa',
        KS: 'Kansas',
        KY: 'Kentucky',
        LA: 'Louisiana',
        ME: 'Maine',
        MD: 'Maryland',
        MA: 'Massachusetts',
        MI: 'Michigan',
        MN: 'Minnesota',
        MS: 'Mississippi',
        MO: 'Missouri',
        MT: 'Montana',
        NE: 'Nebraska',
        NV: 'Nevada',
        NH: 'New Hampshire',
        NJ: 'New Jersey',
        NM: 'New Mexico',
        NY: 'New York',
        NC: 'North Carolina',
        ND: 'North Dakota',
        OH: 'Ohio',
        OK: 'Oklahoma',
        OR: 'Oregon',
        PA: 'Pennsylvania',
        RI: 'Rhode Island',
        SC: 'South Carolina',
        SD: 'South Dakota',
        TN: 'Tennessee',
        TX: 'Texas',
        UT: 'Utah',
        VT: 'Vermont',
        VA: 'Virginia',
        WA: 'Washington',
        WV: 'West Virginia',
        WI: 'Wisconsin',
        WY: 'Wyoming',
    }

    const styling = {
        height: '100%',
        margin: '0 8px',
        textAlign: 'center',
        border: 'none',
        backgroundColor: 'white',
        fontFamily: "Roboto Slab, 'Roboto', 'Helvetica Neue', sans-serif",
        option: {
            fontWeight: "100",
            fontFamily: "Roboto Slab, 'Roboto', 'Helvetica Neue', sans-serif"
        }
    }

    return (

        <select name="states" value={place} onChange={e => setPlace(e.target.value)} style={styling}>
            <option value="" >Pick a state</option>
            {Object.entries(states).map((state, i) => {
                return (
                    <option value={state[0]} key={i}>{state[1]}</option>
                )
            })}
        </select >
    )
}

export default UsStateSelect