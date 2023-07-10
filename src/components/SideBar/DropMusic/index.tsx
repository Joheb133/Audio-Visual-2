import { useState } from "react";
import AudioUploader from "./AudioUploader";
import { audioList } from "./audioList";
import { AudioSettingsProp } from "../../../App";
import { audioDataType } from "../../../types";
import SongBox from "./SongBox";

interface DropMusicProp {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
  queue: audioDataType[];
  setQueue: React.Dispatch<React.SetStateAction<audioDataType[]>>;
  queueIndex: number;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
  metaData?: audioDataType["metaData"];
}

export default function DropMusic({
  isPlaying,
  setIsPlaying,
  audioSettings,
  queue,
  setQueue,
  queueIndex,
  setQueueIndex,
  metaData,
}: DropMusicProp) {
  const [songList, setSongList] = useState<audioDataType[]>(audioList);

  return (
    <div className="flex flex-col gap-4">
      <span className="sidebar-component-title">Drop Music File</span>
      <AudioUploader setSongList={setSongList} />
      <span className="text-neutral-500 font-medium text-base">
        Local Music
      </span>
      <div className="h-full">
        {songList.map((_, index) => (
          <SongBox
            key={index}
            index={index}
            audioList={audioList}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            audioSettings={audioSettings}
            queue={queue}
            setQueue={setQueue}
            queueIndex={queueIndex}
            setQueueIndex={setQueueIndex}
            metaData={metaData}
          />
        ))}
      </div>
    </div>
  );
}
