import Search from "./Search";
import DropMusic from "./DropMusic";
import Library from "./Library";
import { VscLibrary } from "react-icons/vsc";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillFileEarmarkMusicFill } from "react-icons/bs";
import { useState } from "react";
import { AudioSettingsProp } from "../../App";

interface SideBarProp {
  songInfoRef: React.MutableRefObject<any>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
}

export default function SideBar({
  songInfoRef,
  isPlaying,
  setIsPlaying,
  audioSettings,
}: SideBarProp) {
  const [selectedCompoenent, setselectedCompoenent] = useState("dropMusic");

  function renderComponent(componentKey: string) {
    switch (componentKey) {
      case "library":
        return <Library />;
      case "search":
        return <Search songInfoRef={songInfoRef} />;
      case "dropMusic":
        return (
          <DropMusic
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            audioSettings={audioSettings}
          />
        );
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full h-20 rounded-md overflow-hidden text-white">
        <button
          className="sidebar-buttons group"
          onClick={() => setselectedCompoenent("library")}
        >
          <VscLibrary size="38" className="sidebar-buttons-svg" />
        </button>
        <button
          className="sidebar-buttons group"
          onClick={() => setselectedCompoenent("search")}
        >
          <AiOutlineSearch size="36" className="sidebar-buttons-svg" />
        </button>
        <button
          className="sidebar-buttons group"
          onClick={() => setselectedCompoenent("dropMusic")}
        >
          <BsFillFileEarmarkMusicFill
            size="30"
            className="sidebar-buttons-svg"
          />
        </button>
      </div>
      <div className="w-[380px] p-4 grow bg-neutral-900 rounded-md">
        {renderComponent(selectedCompoenent)}
      </div>
    </div>
  );
}
