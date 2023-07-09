import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchBox from "./SearchBox";
import { audioDataType } from "../../../types";
import { AudioSettingsProp } from "../../../App";

interface SearchProp {
  searchListRef: React.MutableRefObject<audioDataType[] | undefined>;
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
  searchListRef,
  isPlaying,
  setIsPlaying,
  audioSettings,
  queue,
  setQueue,
  setQueueIndex,
}: SearchProp) {
  const [searchList, setSearchList] = useState<audioDataType[]>();
  const [currentIndex, setCurrentIndex] = useState<number>();

  useEffect(() => {
    if (searchList) {
      searchListRef.current = searchList;
    }
  }, [searchList]);

  useEffect(() => {
    setSearchList(searchListRef.current);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <span className="sidebar-component-title">Search</span>
      <SearchBar setSearchList={setSearchList} />
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
