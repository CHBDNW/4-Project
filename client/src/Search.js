
function Search({search, setSearch}) {
    function handleChange(e) {
        setSearch(e.target.value)
    }
    return (
        <div>
        <label htmlFor="search">Search:</label>
        <input id="search" onChange={handleChange} value={search} />
        </div>

    )
}
export default Search