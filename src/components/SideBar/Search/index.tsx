import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchBox from "./SearchBox";
import { audioDataType } from "../../../types";
import { AudioSettingsProp } from "../../../App";

interface SearchProp {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
  queue: audioDataType[];
  setQueue: React.Dispatch<React.SetStateAction<audioDataType[]>>;
  selectedComponent: string;
  queueIndex: number;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Search({
  isPlaying,
  setIsPlaying,
  audioSettings,
  queue,
  setQueue,
  setQueueIndex,
}: SearchProp) {
  const [searchList, setSeachList] = useState<audioDataType[]>();

  return (
    <div className="flex flex-col gap-4">
      <span className="sidebar-component-title">Search</span>
      <SearchBar setSearchList={setSeachList} />
      <div>
        {searchList?.map((value, index) => {
          return (
            <SearchBox
              key={index}
              audioData={value}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              audioSettings={audioSettings}
              queue={queue}
              setQueue={setQueue}
              setQueueIndex={setQueueIndex}
            />
          );
        })}
      </div>
    </div>
  );
}
