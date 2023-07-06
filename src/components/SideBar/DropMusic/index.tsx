import { useState } from "react";
import AudioUploader from "./AudioUploader";
import SongList from "./SongList";
import { audioList } from "./audioList";
import { AudioSettingsProp } from "../../../App";
import { audioDataType } from "../../../types";

interface DropMusicProp {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
  queue: audioDataType[];
  setQueue: React.Dispatch<React.SetStateAction<audioDataType[]>>;
}

export default function DropMusic({
  isPlaying,
  setIsPlaying,
  audioSettings,
  queue,
  setQueue,
}: DropMusicProp) {
  const [songList, setSongList] = useState<audioDataType[]>(audioList);

  return (
    <div className="flex flex-col gap-4">
      <span className="sidebar-component-title">Drop Music</span>
      <AudioUploader setSongList={setSongList} />
      <span className="text-neutral-500 font-medium text-base">
        Local Music
      </span>
      <SongList
        songList={songList}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioSettings={audioSettings}
        queue={queue}
        setQueue={setQueue}
      />
    </div>
  );
}
