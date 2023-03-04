import React from 'react'
import { useScreenModeContext } from '../../../auth/useScreenMode'
import Logo from '../Logo'
import RoundedBlock from '../RoundedBlock'
import Slide from './Slide'

const Title = () => {
    const screenMode = useScreenModeContext()
    const isTouchEnabled = ('ontouchstart' in window)
        || (navigator.msMaxTouchPoints > 0)
        console.log(window.ontouchstart, navigator)

    return (
        <Slide>
            <Logo />
            <h1 style={{ fontSize: screenMode === 'narrow' ? '1.2rem' : '1.5rem' }}>Welcome to FeatherTrace, the best place to explore North American birds!</h1>
            <p>Here we arrange birds by their taxonomies so you can see how they are all related. Scale the avian evolutionary tree like nowhere else!</p>
            
        </Slide>
    )
}

export default Title