import React from 'react'

const TaxonomyGroup = ({ data, taxonomyName }) => {
    const getSubContent = obj => {
        if (obj.images) return obj
        return getSubContent(getSubItem(obj))
    }
    const getSubItem = obj => {
        console.log('here we go')
        let subItem
        for (subItem in obj) break
        return obj[subItem]
    }
    // get one image for each subgroup.
    const images = []
    for (const item in data) {
        images.push(getSubContent(data[item]).images[0])
    }


    return (

        <section>
            {taxonomyName}
            <ul>
                {images.map((url, i) => (
                    <li key={i}>
                        <img src={url} width='80px'/>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default TaxonomyGroup