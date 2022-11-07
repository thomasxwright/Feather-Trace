import { useState } from "react"

const InfoSegment = ({ title, info }) => {

    const [visibility, setVisibility] = useState(info.join('').length < 250)

    const styling = {
        title: {
            padding: '15px',
            margin: '0px'
        },
        info: {
            flexDirection: 'column',
        }
    }

    const handleClick = () => setVisibility(true)
    const abbreviatedInfoSegment = segment => {
        let words = segment[0].slice(0, 150).split(' ')
        words.pop()
        return `${words.join(' ')}...`
    }

    return (
        <section onClick={!visibility ? handleClick : undefined} style={visibility ? {} : {cursor: 'pointer'}}>
            <h5 style={styling.title} >{title}</h5>
            <section style={styling.info}>
                {/* {visibility ? <p>visible {info.join('').length}</p> : <p>not visible {info.length}</p>} */}
                {!visibility ? <p>{abbreviatedInfoSegment(info)}</p> : info.map((p, i) => (
                    <p key={i}>
                        {p}
                    </p>
                ))
                }
            </section>
        </section>
    )
}

export default InfoSegment