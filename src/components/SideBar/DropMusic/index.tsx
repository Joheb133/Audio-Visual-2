import { useEffect, useState } from "react";
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
  selectedComponent: string;
  queueIndex: number;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function DropMusic({
  isPlaying,
  setIsPlaying,
  audioSettings,
  queue,
  setQueue,
  selectedComponent,
  queueIndex,
  setQueueIndex,
}: DropMusicProp) {
  const [songList, setSongList] = useState<audioDataType[]>(audioList);
  const [isQueue, setIsQueue] = useState(false);

  useEffect(() => {
    if (queue !== songList && isQueue && selectedComponent === "dropMusic") {
      setQueue(songList);
    }
  }, [songList, isQueue]);

  return (
    <div className="flex flex-col gap-4">
      <span className="sidebar-component-title">Drop Music File</span>
      <AudioUploader setSongList={setSongList} />
      <span className="text-neutral-500 font-medium text-base">
        Local Music
      </span>
      <div className="h-full">
        {songList.map((song, index) => (
          <SongBox
            key={index}
            index={index}
            title={song.metaData.title}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            audioSettings={audioSettings}
            isQueue={isQueue}
            setIsQueue={setIsQueue}
            queueIndex={queueIndex}
            setQueueIndex={setQueueIndex}
          />
        ))}
      </div>
    </div>
  );
}
