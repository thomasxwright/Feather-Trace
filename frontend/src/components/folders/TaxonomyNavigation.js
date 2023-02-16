import { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import TaxonomyTag from './TaxonomyTag'

/* TODO: The last tag in the list has a badly coded setActiveTaxonomy condition.
A tag should take us into that tag, unless we're already in that tag, in which case it should step out.
As it works now, it is using the zIndex, along with the tag's placing in the li, to tell whether it should move to that tag or step back.
Fixing this will involve remaking setActiveTaxonomy.
*/

const TaxonomyNavigation = ({ taxonomies, zIndex, setActiveTaxonomy, stylingAdjustments = {}, reference = null }) => {

  const innermostTaxonomy = taxonomies[taxonomies.length - 1]

  const { theme } = useContext(ThemeContext)
  const styling = {
    marginLeft: '4px',
    marginTop: '0px',
    marginBottom: '0px',
    display: 'flex',
    listStyle: 'none',
    zIndex: zIndex,
    position: 'relative',
    overflowX: 'scroll',
    scrollbarWidth: 'none',
    ...stylingAdjustments
    // I tried all this stuff to hide the scroll bar using inline styles, but none of it worked. In the end I had to add a class to the ul below and attach a style to the stylesheet App.css.
    // overflowScrolling: 'touch',
    // '&::-webkit-scrollbar': { width: 0, height: 0},
    // '&::WebkitScrollbar': { width: 0, height: 0 },
    // overflowScrolling: 'touch',    // https://stackoverflow.com/questions/39053177/how-to-set-webkit-overflow-scrolling-inline-style-on-react-component,
    // webkitScrollbar: 'display:none',
    // WebkitScrollbar: 'none',
    // WebKitOverflowScrolling: 'touch',
    // -ms-overflow-style: none;  /* IE and Edge */
  }

  return (
    //The marginTop property pushes down the inner content of the roundedBox. Fix this at some point.
    <ul style={styling} ref={reference} className='taxonomy-navigation'>
      {taxonomies.slice(0, taxonomies.length - 1).map((taxonomy, i) => (
        <li key={i}>
          <TaxonomyTag
            taxonomy={taxonomy}
            color={theme.taxonomies[taxonomy[0]]}
            stylingAdjustments={{ marginRight: '-28px', marginTop: '4px', paddingRight: '35px' }}
            setActiveTaxonomy={() => setActiveTaxonomy[taxonomy[0]](taxonomy[1])}
          />
        </li>
      ))}
      {
        taxonomies.length > 0 &&
        <li key={taxonomies.length - 1}>
          <TaxonomyTag
            taxonomy={taxonomies[taxonomies.length - 1]}
            color={theme.taxonomies[taxonomies[taxonomies.length - 1][0]]}
            setActiveTaxonomy={zIndex === 0 || zIndex === 3 ? () => setActiveTaxonomy.stepOutOneLevel() : () => setActiveTaxonomy[innermostTaxonomy[0]](innermostTaxonomy[1])}
            boostedTag={true}
            stylingAdjustments={{ paddingBottom: '22px' }}
          />
        </li>
      }
    </ul>
  )
}

export default TaxonomyNavigation