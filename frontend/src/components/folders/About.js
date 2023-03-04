import { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import Carousel from './Carousel'
import Dialog from './Dialog'
import AboutAves from './IntroSlides/AboutAves'
import LetsGo from './IntroSlides/LetsGo'
import Login from './IntroSlides/Login'
import Navigation from './IntroSlides/Navigation'
import Title from './IntroSlides/Title'
import Logo from './Logo'

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