import { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeContextManagement'

const SearchTextFilter = ({ searchText, setSearchText, handleSubmit }) => {

    const { theme } = useContext(ThemeContext)
    const styling = {
        form: {
            display: 'flex',
            alignItems: 'stretch'
        },
        input: {
            border: 'none',
            fontFamily: "Roboto Slab, 'Roboto', 'Helvetica Neue', sans-serif",
            textAlign: 'center',
            backgroundColor: theme.filters.inner,
            color: theme.text
        }
    }

    return (
        <form onSubmit={handleSubmit} style={styling.form}>
            <input type='text' placeholder='search for a bird' value={searchText} onChange={e => setSearchText(e.target.value)} onFocus={e => e.target.select()} style={styling.input} />
        </form>
    )
}

export default SearchTextFilter