import { useState } from "react";
import { audioDataType } from "../../../types";
import { FaPause, FaPlay } from "react-icons/fa";
import { AudioSettingsProp } from "../../../App";

interface SongListProp {
  songList: audioDataType[];
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
  queue: audioDataType[];
  setQueue: React.Dispatch<React.SetStateAction<audioDataType[]>>;
}

export default function SongList({
  songList,
  isPlaying,
  setIsPlaying,
  audioSettings,
  queue,
  setQueue,
}: SongListProp) {
  return (
    <div className="h-full">
      {songList.map((song, index) => (
        <SongBox
          key={index}
          index={index + 1}
          title={song.metaData.title}
          songList={songList}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioSettings={audioSettings}
          queue={queue}
          setQueue={setQueue}
        />
      ))}
    </div>
  );
}

interface SongBoxProp {
  index: number;
  title: string;
  songList: audioDataType[];
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
  queue: audioDataType[];
  setQueue: React.Dispatch<React.SetStateAction<audioDataType[]>>;
}

function SongBox({
  index,
  title,
  songList,
  isPlaying,
  setIsPlaying,
  audioSettings,
  queue,
  setQueue,
}: SongBoxProp) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="flex gap-2 items-center px-2 w-full h-12 bg-neutral-900 
      rounded-md cursor-default hover:bg-neutral-800"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="w-6 h-6 flex justify-center items-center">
        {isHover ? (
          <button
            className="text-white cursor-default"
            onMouseDown={() => {
              if (queue.length < 1) {
                setQueue(songList);
                console.log("Playing from drop music");
              }
              if (!audioSettings?.audioCtx || !audioSettings?.source) return;
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? <FaPause size="12" /> : <FaPlay size="12" />}
          </button>
        ) : (
          <span className="text-neutral-400">{index}</span>
        )}
      </div>
      <div>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap w-64 block text-white">
          {title}
        </span>
      </div>
    </div>
  );
}
