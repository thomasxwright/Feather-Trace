import { useContext } from 'react'
import RoundedBlock from '../RoundedBlock'
import { ReactComponent as HomeIcon } from '../../images/home.svg'
import { ThemeContext } from '../../utils/ThemeContextManagement'

const HomeTag = ({ stylingAdjustments = {}, stepFullyOut }) => {

    const { theme } = useContext(ThemeContext)
    const boostedAdjustments = {
        borderRadius: '29px',
        cursor: 'pointer',
        padding: '0px 12px',
        height: '50px',
        display: 'flex',
        alignItems: 'center'
    }

    return (
        <div onClick={stepFullyOut} >
            <RoundedBlock stylingAdjustments={{ ...stylingAdjustments, ...boostedAdjustments }} >
                <HomeIcon color={theme.dark ? theme.text : 'white'} width='28px' />
            </RoundedBlock>
        </div>
    )
}

export default HomeTag