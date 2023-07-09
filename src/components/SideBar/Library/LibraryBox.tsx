import { useState } from "react";
import { audioDataType } from "../../../types";
import formatSeconds from "../../../helpers/formatSeconds";
import { FaPause, FaPlay } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { AudioSettingsProp } from "../../../App";

interface LibraryBoxProp {
  index: number;
  libraryList: audioDataType[];
  setLibraryList: React.Dispatch<React.SetStateAction<audioDataType[]>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
  queue: audioDataType[];
  setQueue: React.Dispatch<React.SetStateAction<audioDataType[]>>;
  queueIndex: number;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function LibraryBox({
  index,
  libraryList,
  setLibraryList,
  isPlaying,
  setIsPlaying,
  audioSettings,
  queue,
  setQueue,
  queueIndex,
  setQueueIndex,
}: LibraryBoxProp) {
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
          className="relative cursor-default"
          onClick={() => {
            //set queue
            if (queue !== libraryList) {
              setQueue(libraryList);
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
          <img
            src={libraryList[index].metaData.imgUrl}
            alt="thumbnail"
            className={`w-10 h-10 object-cover object-center blur-[0.45px] ${
              isHover ? `filter brightness-75` : ""
            }`}
          />
          {isHover &&
            (isPlaying && index === queueIndex ? (
              <FaPause size="13" className="abs-center text-white" />
            ) : (
              <FaPlay size="13" className="abs-center text-white" />
            ))}
        </button>
      </div>
      <div className="flex flex-col gap-1 text-white">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap w-56 block text-sm">
          <a href={libraryList[index].metaData.videoUrl} target="_blank">
            {libraryList[index].metaData.title}
          </a>
        </span>
        <span className="text-xs overflow-hidden text-ellipsis whitespace-nowrap w-56 block text-neutral-400">
          {libraryList[index].metaData.channel}
        </span>
      </div>
      <div className="flex">
        <button
          onClick={() => {
            setLibraryList(libraryList.filter((_, i) => i !== index));
          }}
        >
          <HiX className={`text-white opacity-50 hover:opacity-100`} />
        </button>
      </div>
      <div className="ml-auto text-neutral-400 text-sm">
        <span>{formatSeconds(libraryList[index].metaData.duration)}</span>
      </div>
    </div>
  );
}
