import { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import audioList from "../../../audioList";

interface SearchBarProp {
  songInfoRef: React.MutableRefObject<any>;
}

export default function SearchBar({ songInfoRef }: SearchBarProp) {
  const searchBarRef = useRef<HTMLInputElement>(null);

  async function getAudioInfo(input: string) {
    try {
      const res = await fetch(`/api/info?v=${input}`);
      if (!res.ok) {
        throw new Error("Failed to fetch info");
      }
      return await res.json();
    } catch (err) {
      return console.log(err);
    }
  }

  function getAudio(input: string) {
    audioList.unshift(`/api/audio?v=${input}`);
  }

  function searchID() {
    const searchBar = searchBarRef.current;
    const input = searchBar?.value;
    if (!input) return;

    getAudio(input);
    getAudioInfo(input).then((res) => {
      // setSongInfo(res);
      songInfoRef.current = res;
    });
    searchBar.value = "";
  }

  return (
    <div className="gap-2 w-full flex text-white">
      <input
        ref={searchBarRef}
        type="text"
        className="w-full h-6 bg-neutral-700 py-4 px-2 rounded-md outline-none text-xs"
      />
      <button className="opacity-70 hover:opacity-100" onClick={searchID}>
        <AiOutlineSearch size="24" />
      </button>
    </div>
  );
}