import { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import Carousel from './introSlides/Carousel'
import Dialog from './Dialog'
import AboutAves from './introSlides/AboutAves'
import LetsGo from './introSlides/LetsGo'
import Login from './introSlides/Login'
import Navigation from './introSlides/Navigation'
import Title from './introSlides/Title'

const About = ({ setMessage }) => {

    const { theme } = useContext(ThemeContext)
    return (
        <Dialog stylingAdjustments={{ width: '500px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Carousel>
                    <Title />
                    <AboutAves />
                    <Navigation />
                    <Login />
                    <LetsGo setMessage={setMessage} />
                </Carousel>
            </div>
        </Dialog>
    )
}

export default About