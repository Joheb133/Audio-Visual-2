import { useState } from "react";
import { audioDataType } from "../../../types";
import formatSeconds from "../../../helpers/formatSeconds";
import { FaPause, FaPlay } from "react-icons/fa";
import { AudioSettingsProp } from "../../../App";

interface SearchBoxProp {
  audioData: audioDataType;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
  queue: audioDataType[];
  setQueue: React.Dispatch<React.SetStateAction<audioDataType[]>>;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function SearchBox({
  audioData,
  isPlaying,
  setIsPlaying,
  audioSettings,
  queue,
  setQueue,
  setQueueIndex,
}: SearchBoxProp) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="flex gap-2 items-center p-2 w-full h-14 bg-neutral-900 
      rounded-md cursor-default hover:bg-neutral-800"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="w-10 h-10">
        <button
          className="relative cursor-auto"
          onClick={() => {
            //set queue
            if (JSON.stringify(queue) !== JSON.stringify([audioData])) {
              setQueue([audioData]);
              setQueueIndex(0);
            }

            if (!audioSettings?.audioCtx || !audioSettings?.source) return;

            setIsPlaying(!isPlaying);
          }}
        >
          <img
            src={audioData.metaData.imgUrl}
            alt="thumbnail"
            className={`w-10 h-10 object-cover blur-[0.45px] ${
              isHover ? `filter brightness-75` : ""
            }`}
          />
          {isHover &&
            (isPlaying ? (
              <FaPause size="13" className="abs-center text-neutral-300" />
            ) : (
              <FaPlay size="13" className="abs-center text-neutral-300" />
            ))}
        </button>
      </div>
      <div className="flex flex-col gap-1 text-white">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap w-60 block text-sm">
          <a href={audioData.metaData.videoUrl} target="_blank">
            {audioData.metaData.title}
          </a>
        </span>
        <span className="text-xs overflow-hidden text-ellipsis whitespace-nowrap w-60 block text-neutral-400">
          {audioData.metaData.channel}
        </span>
      </div>
      <div className="ml-auto text-neutral-400 text-sm">
        <span>{formatSeconds(audioData.metaData.duration)}</span>
      </div>
    </div>
  );
}
