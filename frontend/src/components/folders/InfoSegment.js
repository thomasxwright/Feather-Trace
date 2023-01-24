import { useState } from "react"

const InfoSegment = ({ title, info }) => {

    const [visibility, setVisibility] = useState(info.join('').length < 1000)

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
    const abbreviatedInfoSegment = paragraph => {
        let words = paragraph.slice(0, 250).split(' ')
        words.pop()
        return `${words.join(' ')}...`
    }

    const firstWritableSegment = info.find(paragraph => {
        const firstColon = paragraph.indexOf(':')
        const firstPeriod = paragraph.indexOf('.')
        const isWriting = (firstPeriod < firstColon && firstPeriod > -1) || firstColon === -1
        return paragraph.length > 50 || isWriting
    })

    return (
        <section onClick={!visibility ? handleClick : undefined} style={visibility ? {} : { cursor: 'pointer' }}>
            <h5 style={styling.title} >{title}</h5>
            <section style={styling.info}>
                {/* {visibility ? <p>visible {info.join('').length}</p> : <p>not visible {info.length}</p>} */}
                {!visibility ? <p>{abbreviatedInfoSegment(firstWritableSegment)}</p> : info.map((p, i) => (
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