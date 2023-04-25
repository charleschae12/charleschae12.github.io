//Search Bar is a tool for creating right design that holds input text for searching.

const SearchBar = ({keyword, onChange}) => {
    return (
        <input
          type = 'text'
          placeholder = 'Type something to search!'
          style={{
            padding: '10px',
            backgroundColor: '#ffffffe0',
            borderRadius: '25px',
            width: '40vw',
            border: 'none',
            height: '60px',
            textAlign: 'left',
        }}
            value = {keyword}
            onChange = {(e) => onChange(e.target.value)}
        />
    );
}

export default SearchBar;