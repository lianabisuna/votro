import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { SongContext } from "../../contexts/SongContext";

const SearchInput = () => {
  const { search, setSearch, searchFor, setFilteredSongs, setSearchClick } = useContext(SongContext);
  const history = useHistory();

  const handleClick = e => {
    e.preventDefault();
    if (history.location.pathname !== '/') {
      history.push('/');
    }
    setSearchClick(true)
    searchFor();
  }

  const handleClear = e => {
    setSearch('');
    setFilteredSongs([]);
  }

  const handleChange = e => {
    setSearchClick(false);
    setSearch(e.target.value)
  }

  return (
    <form onSubmit={e => handleClick(e)}>
      <div className="flex min-w-full gap-2">
        <div className="relative w-full flex align-center">
          <input
            value={search}
            onChange={e => handleChange(e)}
            type="text"
            className="h-14 bg-gray-800 text-white w-full px-5 outline-none focus:bg-gray-700 "
            placeholder="search for song title, artist, album, writer or lyrics"
          />
          {search &&
            <div className="h-full absolute right-5 flex align-center">
              <button
                type="button"
                onClick={e => handleClear(e)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          }
        </div>
        <button type="submit" className="h-14 bg-black text-white px-5 w-1/6 hover:bg-opacity-60">
          search
        </button>
      </div>
    </form>
  );
}
 
export default SearchInput;