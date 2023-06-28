import SearchBar from "./SearchBar";
import { VscLibrary } from "react-icons/vsc";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillFileEarmarkMusicFill } from "react-icons/bs";
import { useState } from "react";

interface SideBarProp {
  setSongInfo: React.Dispatch<null>;
}

export default function SideBar({ setSongInfo }: SideBarProp) {
  const dictionary = {
    library: "",
    search: <SearchBar setSongInfo={setSongInfo} />,
    dropMusic: "",
  };
  const [sideBarComponent, setSideBarComponent] = useState<any>(
    dictionary.search
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center w-full h-20 rounded-md text-white">
        <button
          className="sidebar-buttons group"
          onClick={() => setSideBarComponent(dictionary.library)}
        >
          <VscLibrary size="38" className="sidebar-buttons-svg" />
          <span className="sidebar-buttons-tooltip">Library</span>
        </button>
        <button
          className="sidebar-buttons group"
          onClick={() => setSideBarComponent(dictionary.search)}
        >
          <AiOutlineSearch size="36" className="sidebar-buttons-svg" />
          <span className="sidebar-buttons-tooltip">Search Music</span>
        </button>
        <button
          className="sidebar-buttons group"
          onClick={() => setSideBarComponent(dictionary.dropMusic)}
        >
          <BsFillFileEarmarkMusicFill
            size="30"
            className="sidebar-buttons-svg"
          />
          <span className="sidebar-buttons-tooltip">Drop music</span>
        </button>
      </div>
      <div className="w-[380px] grow bg-neutral-900 rounded-md">
        {sideBarComponent}
      </div>
    </div>
  );
}
