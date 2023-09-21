import { AudioSettingsProp } from "../../../App";
import { audioDataType } from "../../../types";
import LibraryBox from "./LibraryBox";

interface LibraryProp {
  libraryList: audioDataType[];
  setLibraryList: React.Dispatch<React.SetStateAction<audioDataType[]>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
  queue: audioDataType[];
  setQueue: React.Dispatch<React.SetStateAction<audioDataType[]>>;
  queueIndex: number;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
  metaData?: audioDataType["metaData"];
}

export default function Library({
  libraryList,
  setLibraryList,
  isPlaying,
  setIsPlaying,
  audioSettings,
  queue,
  setQueue,
  queueIndex,
  setQueueIndex,
  metaData,
}: LibraryProp) {
  return (
    <div className="flex h-full flex-col gap-4">
      <span className="sidebar-component-title">Library</span>
      <div className="h-full relative">
        <div className="absolute h-full overflow-y-auto custom-scroll pr-1">
          {libraryList?.map((_, index) => {
            return (
              <LibraryBox
                key={index}
                index={index}
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
          })}
        </div>
      </div>
    </div>
  );
}
