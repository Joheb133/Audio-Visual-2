import { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import audioList from "../../audioList";
import useFetchAudio from "../../hooks/useFetchAudio";

interface SideBarProp {
  setSongInfo: React.Dispatch<null>;
}

export default function SideBar({ setSongInfo }: SideBarProp) {
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
      setSongInfo(res);
    });
    searchBar.value = "";
  }

  return (
    <div className="sidebar w-[380px] bg-neutral-900 rounded-md">
      <div className="search-container p-3 gap-2 w-full flex text-white">
        <input
          ref={searchBarRef}
          type="text"
          className="search-bar w-full h-6 bg-neutral-700 py-4 px-2 rounded-md outline-none text-xs"
        />
        <button className="opacity-70 hover:opacity-100" onClick={searchID}>
          <AiOutlineSearch size="24" />
        </button>
      </div>
    </div>
  );
}
