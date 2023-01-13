import ContentLoader from "react-content-loader"

const PlaceholderBird = () => (
  <ContentLoader 
    speed={1}
    width={900}
    height={550}
    viewBox="0 0 600 550"
    backgroundColor="#f3f3f3"
    foregroundColor="#e2dff9"
  >
    <rect x="266" y="72" rx="2" ry="2" width="291" height="21" /> 
    <rect x="1" y="336" rx="2" ry="2" width="189" height="25" /> 
    <rect x="-2" y="70" rx="2" ry="2" width="244" height="243" /> 
    <rect x="269" y="106" rx="2" ry="2" width="291" height="21" /> 
    <rect x="271" y="150" rx="2" ry="2" width="93" height="21" /> 
    <rect x="271" y="227" rx="2" ry="2" width="291" height="21" /> 
    <rect x="270" y="269" rx="2" ry="2" width="291" height="21" /> 
    <rect x="268" y="309" rx="2" ry="2" width="291" height="21" /> 
    <rect x="178" y="20" rx="2" ry="2" width="116" height="26" />
  </ContentLoader>
)

export default PlaceholderBird