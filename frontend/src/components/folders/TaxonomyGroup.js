import React from 'react'
import expandContract from '../../utils/expandContract'
import TaxonomyNavigation from './TaxonomyNavigation'
import BlockWithNavTags from './BlockWithNavTags'

const TaxonomyGroup = ({ data, taxonomies, setActiveTaxonomy }) => {

    const styling = {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        justifyContent: 'center',
        // maxWidth: condensedWidth,
    }

    const getSubContent = obj => {
        if (obj.images) return obj
        return getSubContent(getSubItem(obj))
    }
    const getSubItem = obj => {
        let subItem
        for (subItem in obj) break
        return obj[subItem]
    }
    // get one image for each subgroup.
    const images = []
    
    // Placeholder for special bird component: Actually, a taxonomygroup wouldn't even be rendered here. Instead, a BirdCard would be here.
    if (data._id) { images.push(data.images[0]) }
    else {
        for (const item in data) {
            images.push(getSubContent(data[item]).images[0])
        }
    }
    const condensedWidth = '9000px'


    return (

        <BlockWithNavTags taxonomies={taxonomies} setActiveTaxonomy={setActiveTaxonomy}>
            <ul style={styling}>
                {images.map((url, i) => (
                    <li key={i}>
                        <img src={url} style={{ height: '90px', outline: '4px solid white', margin: '4px 0 0 4px', maxWidth: '320px' }} />
                    </li>
                ))}
            </ul>
        </BlockWithNavTags>

        // <section>
        //     {/* {taxonomyName} */}
        //     {/* <BlockingOverlay expandGroup={expandGroup} isExpanded={isExpanded} setIsExpanded={setIsExpanded} colors={headerColor} zIndex={zIndex} /> */}
        //     <TaxonomyNavigation taxonomies={[taxonomyName]} />

        //     <ul style={styling}>
        //         {images.map((url, i) => (
        //             // <li key={i}>
        //             //     <img src={url} width='80px'/>
        //             // </li>


        //             <li key={i}>
        //                 <div style={{ lineHeight: '0' }}>
        //                     <img src={url} style={{ height: '90px', outline: '4px solid white', margin: '4px 0 0 4px', maxWidth: '320px' }} loading='lazy'
        //                     />
        //                 </div>
        //                 {/* <img src={Object.entries(family[0])[0][0].images[0]} /> */}
        //             </li>
        //         ))}
        //     </ul>
        // </section>
    )
}

export default TaxonomyGroup