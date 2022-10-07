import Genus from "./Genus"

const Family = ({ familyData, familyName }) => {
    return (
        <ul className="family">
            <span>{familyName}</span>
            {Object.entries(familyData).map(genus => {
                return (
                    <li key={genus[0]}>
                        <Genus genusData={genus[1]} genusName={genus[0]} />
                    </li>
                )
            })}
        </ul>
    )
}

export default Family