import { ReactComponent as Taxonomies } from '../../../images/taxonomies2.svg'
import { useScreenModeContext } from '../../../utils/useScreenMode'

const AboutAves = () => {

    const screenMode = useScreenModeContext()
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Taxonomies width={screenMode === 'narrow' ? '100%' : '80%'} />
            <p>
                All birds exist inside the avian class Aves!  By default FeatherTrace shows all 26 orders of American birds inside Aves.
            </p>
        </div>
    )
}

export default AboutAves