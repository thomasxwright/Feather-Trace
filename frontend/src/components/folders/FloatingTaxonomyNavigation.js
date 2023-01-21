import { useState, useEffect } from "react"
import TaxonomyNavigation from "./TaxonomyNavigation"

const FloatingTaxonomyNavigation = ({ taxonomies, setActiveTaxonomy }) => {

    const [showBar, setShowBar] = useState(false)

    const scrollContainer = () => {
        return document.documentElement || document.body
    }

    const onScroll = () => {
        const scroll = scrollContainer().scrollTop
        console.log(scroll)
        if (!showBar && scroll > 300) {
            setShowBar(true)
            console.log('gonna show it, here is showbar: ', showBar)
        }
        else if (showBar && scroll <= 300){
            setShowBar(false)
            console.log('not showing!')
        }
    }

    const onClick = () => {
        document.body.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    const styling = {
        position: 'fixed',
        top: '2rem',
        borderRadius: '100%',
        padding: '0.5rem',
        border: 'none',
        zIndex: 4
    }

    return showBar ? (
        <section style={styling}>
            <p>BEEBO BEEBO</p>
            <TaxonomyNavigation taxonomies={taxonomies} zIndex={4} setActiveTaxonomy={setActiveTaxonomy} />
        </section>
    ) : <></>
}

export default FloatingTaxonomyNavigation