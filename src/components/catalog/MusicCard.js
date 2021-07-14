import { useContext, useEffect, useState } from "react";
import MusicDetail from "../detail";
import albums from "../../assets/albums";
import { SongContext } from "../../contexts/SongContext";

const MusicCard = ({ item }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const { songs } = useContext(SongContext);

  const rank = songs.slice(0, 3);
  const [ribbon, setRibbon] = useState({});
  
  useEffect(() => {
    switch (item.id) {
      case rank[0].id:
        setRibbon({ class: 'ribbon-1', number: '1' });
        break;
      case rank[1].id:
        setRibbon({ class: 'ribbon-2', number: '2' });
        break;
      case rank[2].id:
        setRibbon({ class: 'ribbon-3', number: '3' });
        break;
      default:
      setRibbon({})
        break;
    }
    return () => {
      //
    }
  }, [songs, ribbon, setRibbon, rank, item])

  return (
    <section className="flex bg-white relative">
      <div className="w-5/12 justify-between flex-col flex pr-3 pb-3 pl-3 relative min-h-full">
        <div className="absolute left-0 top-0 h-full min-w-full z-0">
          <img
            src={albums[item.thumbnail]}
            alt={item.album}
            className="object-cover h-full w-full"
          />
        </div>

        <div className="z-10 -m-0.5">
          {ribbon &&
            <button
              className={`${ribbon.class} flex flex-col items-center justify-center cursor-default pt-2 pb-1`}
            >
              <span className="text-white font-bold text-xl">{ ribbon.number }</span>
            </button>
          }
        </div>
        <button
          onClick={() => setIsPlaying(prev => !prev)}
          className="z-10"
        >
          {isPlaying ?
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            : <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          }
        </button>
      </div>

      <MusicDetail item={item} />
    </section>
  );
}
 
export default MusicCard;