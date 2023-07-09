import { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { AudioSettingsProp } from "../../../App";
import formatSeconds from "../../../helpers/formatSeconds";

interface SongBoxProp {
  index: number;
  title: string;
  duration: number;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
  isQueue: boolean;
  setIsQueue: React.Dispatch<React.SetStateAction<boolean>>;
  queueIndex: number;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function SongBox({
  index,
  title,
  duration,
  isPlaying,
  setIsPlaying,
  audioSettings,
  isQueue,
  setIsQueue,
  queueIndex,
  setQueueIndex,
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
              //set queue
              if (!isQueue) {
                setIsQueue(true);
                setQueueIndex(index);
                console.log("Playing from drop music");
              }

              if (!audioSettings?.audioCtx || !audioSettings?.source) return;

              if (index === queueIndex) {
                setIsPlaying(!isPlaying);
              } else {
                setQueueIndex(index);
                setIsPlaying(true);
              }
            }}
          >
            {isPlaying && index === queueIndex ? (
              <FaPause size="13" />
            ) : (
              <FaPlay size="13" />
            )}
          </button>
        ) : (
          <span className="text-neutral-400">{index + 1}</span>
        )}
      </div>
      <div>
        <span
          className={`overflow-hidden text-ellipsis whitespace-nowrap w-64 block text-sm
        ${index === queueIndex && isQueue ? "text-purple-500" : "text-white"}`}
        >
          {title}
        </span>
      </div>
      <div className="text-neutral-400 text-sm ml-auto">
        {formatSeconds(duration)}
      </div>
    </div>
  );
}