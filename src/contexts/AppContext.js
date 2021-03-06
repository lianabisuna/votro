import { useState, createContext } from 'react';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState({});
  const [active, setActive] = useState('popular');
  const [search, setSearch] = useState('');
  const [searchClick, setSearchClick] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [songPlaying, setSongPlaying] = useState({id: null, isPlaying: false, file: ''});
  const [breakpoint, setBreakpoint] = useState('');

  // increase vote
  const increaseVote = id => {
    let updatedSongs = songs.map(song => {
      if (song.id === id)
        song.votes++;
      return song;
    })
    // sort in descending order
    const sortedData = updatedSongs.sort((a, b) => b.votes - a.votes);
    // add rank in first
    // three highest votes
    sortedData.map((song, index) => {
      song.rank = 0;
      switch (index) {
        case 0:
          song.rank = 1;
          break;
        case 1:
          song.rank = 2;
          break;
        case 2:
          song.rank = 3;
          break;
        default:
          song.rank = 0;
          break;
      }
      return song;
    })
    setSongs(sortedData);
  }

  // sort by highest to lowest votes
  const sortByPopular = () => {
    // stop audio playing
    setSongPlaying({isPlaying: false});
    // remove search value
    setSearch('');
    const sortedData = songs.sort((a, b) => b.votes - a.votes);
    setSongs(sortedData);
  }

  // sort by newest to oldest release date
  const sortByLatest = () => {
    // stop audio playing
    setSongPlaying({isPlaying: false});
    // remove search value
    setSearch('');
    const sortedData = songs.sort((a, b) => new Date(b.released) - new Date(a.released));
    setSongs(sortedData);
  }

  // search for songs
  // through keywords
  const searchFor = () => {
    // stop audio playing
    setSongPlaying({isPlaying: false});
    let filteredData = songs.filter(song => {
      const filter = search.toLowerCase();
      const writers = song.writers.join(' ').toLowerCase();
      return (
        song.title.toLowerCase().includes(filter) ||
        song.artist.toLowerCase().includes(filter) ||
        song.album.toLowerCase().includes(filter) ||
        song.lyrics.toLowerCase().includes(filter) ||
        writers.includes(filter)
      )
    })
    setFilteredSongs(filteredData);
  }

  const songValue = { songs, setSongs, song, setSong, increaseVote };
  const sortValue = { active, setActive, sortByPopular, sortByLatest };
  const searchValue = { search, setSearch, searchFor };
  const searchResult = { filteredSongs, setFilteredSongs, searchClick, setSearchClick };
  const audioValue = { songPlaying, setSongPlaying };
  const screenValue = { breakpoint, setBreakpoint };
  const value = {
    ...songValue, ...sortValue, ...searchValue,
    ...searchResult, ...audioValue, ...screenValue
  };

  return(
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;