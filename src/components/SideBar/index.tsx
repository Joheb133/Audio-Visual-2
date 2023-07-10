import Search from "./Search";
import DropMusic from "./DropMusic";
import Library from "./Library";
import { VscLibrary } from "react-icons/vsc";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillFileEarmarkMusicFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { AudioSettingsProp } from "../../App";
import { audioDataType } from "../../types";

interface SideBarProp {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
  queue: audioDataType[];
  setQueue: React.Dispatch<React.SetStateAction<audioDataType[]>>;
  queueIndex: number;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
  metaData?: audioDataType["metaData"];
}

export default function SideBar({
  isPlaying,
  setIsPlaying,
  audioSettings,
  queue,
  setQueue,
  queueIndex,
  setQueueIndex,
  metaData,
}: SideBarProp) {
  const [selectedCompoenent, setselectedCompoenent] = useState("search");
  const [libraryList, setLibraryList] = useState<audioDataType[]>([]);
  const searchListRef = useRef<audioDataType[]>([]);

  function renderComponent(componentKey: string) {
    switch (componentKey) {
      case "library":
        return (
          <Library
            libraryList={libraryList}
            setLibraryList={setLibraryList}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            audioSettings={audioSettings}
            queue={queue}
            setQueue={setQueue}
            queueIndex={queueIndex}
            setQueueIndex={setQueueIndex}
            metaData={metaData}
          />
        );
      case "search":
        return (
          <Search
            searchListRef={searchListRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            audioSettings={audioSettings}
            queue={queue}
            setQueue={setQueue}
            queueIndex={queueIndex}
            setQueueIndex={setQueueIndex}
            libraryList={libraryList}
            setLibraryList={setLibraryList}
            metaData={metaData}
          />
        );
      case "dropMusic":
        return (
          <DropMusic
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            audioSettings={audioSettings}
            queue={queue}
            setQueue={setQueue}
            queueIndex={queueIndex}
            setQueueIndex={setQueueIndex}
            metaData={metaData}
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
      <div className="w-[400px] p-4 grow bg-neutral-900 rounded-md">
        {renderComponent(selectedCompoenent)}
      </div>
    </div>
  );
}
