import { useContext } from "react"
import ContentLoader from "react-content-loader"
import { ThemeContext } from "../../utils/ThemeContextManagement"

const PlaceholderBird = () => {
    const { theme } = useContext(ThemeContext)

  return (
    <ContentLoader
      speed={.5}
      width={270}
      height={320}
      viewBox="0 0 350 320"
      backgroundColor={theme.taxonomies.innermost}
      foregroundColor={theme.taxonomies.species}
    // {...props}
    >
      <rect x="242" y="74" rx="2" ry="2" width="81" height="21" />
      <rect x="1" y="336" rx="2" ry="2" width="189" height="25" />
      <rect x="16" y="70" rx="2" ry="2" width="210" height="209" />
      <rect x="242" y="108" rx="2" ry="2" width="81" height="21" />
      <rect x="33" y="152" rx="2" ry="2" width="93" height="21" />
      <rect x="243" y="143" rx="2" ry="2" width="81" height="21" />
      <rect x="243" y="184" rx="2" ry="2" width="81" height="21" />
      <rect x="242" y="224" rx="2" ry="2" width="81" height="21" />
      <rect x="17" y="21" rx="2" ry="2" width="116" height="26" />
      <rect x="245" y="257" rx="2" ry="2" width="81" height="21" />
      <rect x="17" y="297" rx="2" ry="2" width="310" height="21" />
    </ContentLoader>
  )
}

export default PlaceholderBird