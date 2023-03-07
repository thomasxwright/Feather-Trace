import RoundedBlock from '../RoundedBlock'
import {ReactComponent as Taxonomies} from '../../../images/taxonomies2.svg'
import { useScreenModeContext } from '../../../auth/useScreenMode'

const AboutAves = () => {

    const screenMode = useScreenModeContext()
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Taxonomies width={screenMode === 'narrow' ? '100%' : '80%'}/>
            <p>
                All birds exist inside the avian class Aves!  By default FeatherTrace shows all 26 orders of American birds inside Aves.
            </p>
            
            {/* <div style={{ position: 'relative', width: '100%' }}>
                <RoundedBlock stylingAdjustments={{ backgroundColor: 'red', ...styling , top: 0, right: '300px'}}>
                    <div>Kingdom:</div>
                    <div>Animalia</div>
                </RoundedBlock>
                <RoundedBlock stylingAdjustments={{ backgroundColor: 'orange', ...styling, top: '48px', right: '270px' }}>
                    <div>Phylum:</div>
                    <div>Chordata</div>
                </RoundedBlock>
                <RoundedBlock stylingAdjustments={{ backgroundColor: 'yellow', ...styling, top: '96px', right: '240px' }}>
                    <div>Class:</div>
                    <div>Aves</div>
                </RoundedBlock>
                <RoundedBlock stylingAdjustments={{ backgroundColor: 'blue', ...styling, top: '144px', right: '210px' }}>
                    <div>Order:</div>
                    <div>??</div>
                </RoundedBlock>
                <RoundedBlock stylingAdjustments={{ backgroundColor: 'blueviolet', ...styling, top: '144px', right: '140px' }}>
                    <div>Family:</div>
                    <div>??</div>
                </RoundedBlock>
                <RoundedBlock stylingAdjustments={{ backgroundColor: 'teal', ...styling, top: '144px', right: '72px' }}>
                    <div>Genus:</div>
                    <div>??</div>
                </RoundedBlock>
                <RoundedBlock stylingAdjustments={{ backgroundColor: 'turquoise', ...styling, top: '144px', right: '0' }}>
                    <div>species:</div>
                    <div>??</div>
                </RoundedBlock>
            </div> */}

            {/* <RoundedBlock stylingAdjustments={{ backgroundColor: 'yellow', padding: '12px' }}>
                <div>Class:</div>
                <div>Aves</div>
            </RoundedBlock> */}
        </div>
    )
}

export default AboutAves