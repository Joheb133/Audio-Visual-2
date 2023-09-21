import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchBox from "./SongBox";
import { audioDataType } from "../../../types";
import { AudioSettingsProp } from "../../../App";
import Loading from "../../../svgs/Loading";

interface SearchProp {
  searchListRef: React.MutableRefObject<audioDataType[]>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
  queue: audioDataType[];
  setQueue: React.Dispatch<React.SetStateAction<audioDataType[]>>;
  queueIndex: number;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
  libraryList: audioDataType[];
  setLibraryList: React.Dispatch<React.SetStateAction<audioDataType[]>>;
  metaData?: audioDataType["metaData"];
}

export default function Search({
  searchListRef,
  isPlaying,
  setIsPlaying,
  audioSettings,
  queue,
  setQueue,
  setQueueIndex,
  libraryList,
  setLibraryList,
  metaData,
}: SearchProp) {
  const [searchList, setSearchList] = useState<audioDataType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [isSearching, setIsSearching] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (searchList.length > 1) {
      searchListRef.current = searchList;
    }
  }, [searchList]);

  useEffect(() => {
    setSearchList(searchListRef.current);
  }, []);

  //create rendered component based on search fetch result
  function returnMainComponent() {
    if (isSearching) {
      //loading animation
      return (
        <div className="flex h-full justify-center items-center">
          <Loading size={8} fill="#0a0a0a" />
        </div>
      );
    } else if (isError) {
      //error msg
      return (
        <div className="flex h-full justify-center items-center">
          <span className="text-red-600 text-sm">
            An Error has occured, please try again
          </span>
        </div>
      );
    } else {
      //search results/song list
      return (
        <div className="absolute h-full overflow-auto searchList-container pr-[6px]">
          {searchList?.map((value, index) => {
            return (
              <SearchBox
                key={index}
                index={index}
                audioData={value}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioSettings={audioSettings}
                queue={queue}
                setQueue={setQueue}
                setQueueIndex={setQueueIndex}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                libraryList={libraryList}
                setLibraryList={setLibraryList}
                metaData={metaData}
              />
            );
          })}
        </div>
      );
    }
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <span className="sidebar-component-title">Search</span>
      <SearchBar
        setSearchList={setSearchList}
        setIsSearching={setIsSearching}
        setIsError={setIsError}
      />
      <div className="h-full relative">{returnMainComponent()}</div>
    </div>
  );
}
