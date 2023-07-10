import { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { AudioSettingsProp } from "../../../App";
import formatSeconds from "../../../helpers/formatSeconds";
import { audioDataType } from "../../../types";

interface SongBoxProp {
  index: number;
  audioList: audioDataType[];
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
  queue: audioDataType[];
  setQueue: React.Dispatch<React.SetStateAction<audioDataType[]>>;
  queueIndex: number;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
  metaData?: audioDataType["metaData"];
}

export default function SongBox({
  index,
  audioList,
  isPlaying,
  setIsPlaying,
  audioSettings,
  queue,
  setQueue,
  queueIndex,
  setQueueIndex,
  metaData,
}: SongBoxProp) {
  const [isHover, setIsHover] = useState(false);

  const isQueue = queue === audioList;
  const element = audioList[index];

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
                setQueue(audioList);
                setQueueIndex(index);
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
            {isPlaying && isQueue && element.metaData === metaData ? (
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
        ${
          isQueue && element.metaData === metaData
            ? "text-primary"
            : "text-white"
        }`}
        >
          {element.metaData.title}
        </span>
      </div>
      <div className="text-neutral-400 text-sm ml-auto">
        {formatSeconds(element.metaData.duration)}
      </div>
    </div>
  );
}
