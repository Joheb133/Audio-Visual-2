import Search from "./Search";
import DropMusic from "./DropMusic";
import Library from "./Library";
import { VscLibrary } from "react-icons/vsc";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillFileEarmarkMusicFill } from "react-icons/bs";
import { useState } from "react";

interface SideBarProp {
  songInfoRef: React.MutableRefObject<any>;
}

export default function SideBar({ songInfoRef }: SideBarProp) {
  const dictionary = {
    library: <Library />,
    search: <Search songInfoRef={songInfoRef} />,
    dropMusic: <DropMusic />,
  };
  const [sideBarComponent, setSideBarComponent] = useState<any>(
    dictionary.search
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full h-20 rounded-md overflow-hidden text-white">
        <button
          className="sidebar-buttons group"
          onClick={() => setSideBarComponent(dictionary.library)}
        >
          <VscLibrary size="38" className="sidebar-buttons-svg" />
        </button>
        <button
          className="sidebar-buttons group"
          onClick={() => setSideBarComponent(dictionary.search)}
        >
          <AiOutlineSearch size="36" className="sidebar-buttons-svg" />
        </button>
        <button
          className="sidebar-buttons group"
          onClick={() => setSideBarComponent(dictionary.dropMusic)}
        >
          <BsFillFileEarmarkMusicFill
            size="30"
            className="sidebar-buttons-svg"
          />
        </button>
      </div>
      <div className="w-[380px] p-4 grow bg-neutral-900 rounded-md">
        {sideBarComponent}
      </div>
    </div>
  );
}
