import { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import HomeTag from './HomeTag'
import TaxonomyTag from './TaxonomyTag'

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




    // TODO: rearrange this order and remove the marginbottom stylingadjustment from birdsglossary and blockwithnavtags...
    ...stylingAdjustments,
    marginBottom: '-8px',
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
    // TODO: the marginTop property pushes down the inner content of the roundedBox. Fix this at some point.
    <ul style={styling} ref={reference} className='taxonomy-navigation'>

      {/* The home tag */}
      <li key={-1} >
        <HomeTag
          stepFullyOut={() => setActiveTaxonomy.stepFullyOut()}
          stylingAdjustments={{ marginRight: '-24px', marginTop: '10px', paddingRight: '35px', backgroundColor: theme.taxonomies.order }}
        />
      </li>

      {/* The first tag, which has a stroke around it. if this is the only one, we'll render it lower down in this code instead, as the last one. */}
      {taxonomies.length > 1 && <li key={0}>
        <TaxonomyTag
          taxonomy={taxonomies[0]}
          stylingAdjustments={{ marginRight: '-28px', marginTop: '4px', paddingRight: '35px', backgroundColor: theme.taxonomies[taxonomies[0][0]], outline: `4px solid ${theme.background}` }}
          setActiveTaxonomy={() => setActiveTaxonomy[taxonomies[0][0]](taxonomies[0][1])}
        />
      </li>}

      {/* The rest of the tags until the second last one */}
      {taxonomies.length > 1 && taxonomies.slice(1, taxonomies.length - 1).map((taxonomy, i) => (
        <li key={i + 1}>
          <TaxonomyTag
            taxonomy={taxonomy}
            stylingAdjustments={{ marginRight: '-28px', marginTop: '4px', paddingRight: '35px', backgroundColor: theme.taxonomies[taxonomy[0]] }}
            setActiveTaxonomy={() => setActiveTaxonomy[taxonomy[0]](taxonomy[1])}
          />
        </li>
      ))}

      {/* The last, and possibly only tag */}
      {
        taxonomies.length > 0 &&
        <li key={taxonomies.length}>
          <TaxonomyTag
            taxonomy={taxonomies[taxonomies.length - 1]}
            stylingAdjustments={{
              backgroundColor: theme.taxonomies[taxonomies[taxonomies.length - 1][0]],
            ...taxonomies.length === 1 && {outline: `4px solid ${theme.background}`}
            }}
            setActiveTaxonomy={() => setActiveTaxonomy.stepOutOneLevel()}
          />
        </li>
      }
    </ul>
  )
}

export default TaxonomyNavigation