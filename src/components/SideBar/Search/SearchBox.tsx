import { useState } from "react";
import { audioDataType } from "../../../types";
import formatSeconds from "../../../helpers/formatSeconds";
import { FaPause, FaPlay } from "react-icons/fa";
import { HiPlus, HiX } from "react-icons/hi";
import { AudioSettingsProp } from "../../../App";

interface SearchBoxProp {
  index: number;
  audioData: audioDataType;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
  queue: audioDataType[];
  setQueue: React.Dispatch<React.SetStateAction<audioDataType[]>>;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
  currentIndex?: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  libraryList: audioDataType[];
  setLibraryList: React.Dispatch<React.SetStateAction<audioDataType[]>>;
}

// Don't usually right notes but, this component has some code to play music
// and code to add a song to the Library component

export default function SearchBox({
  index,
  audioData,
  isPlaying,
  setIsPlaying,
  audioSettings,
  queue,
  setQueue,
  setQueueIndex,
  currentIndex,
  setCurrentIndex,
  libraryList,
  setLibraryList,
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
              setCurrentIndex(index);
            }

            if (!audioSettings?.audioCtx || !audioSettings?.source) return;

            if (currentIndex === index) {
              setIsPlaying(!isPlaying);
            }
          }}
        >
          <img
            src={audioData.metaData.imgUrl}
            alt="thumbnail"
            className={`w-10 h-10 object-cover object-center blur-[0.45px] ${
              isHover ? `filter brightness-75` : ""
            }`}
          />
          {isHover &&
            (isPlaying && currentIndex === index ? (
              <FaPause size="13" className="abs-center text-white" />
            ) : (
              <FaPlay size="13" className="abs-center text-white" />
            ))}
        </button>
      </div>
      <div className="flex flex-col gap-1 text-white">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap w-56 block text-sm">
          <a href={audioData.metaData.videoUrl} target="_blank">
            {audioData.metaData.title}
          </a>
        </span>
        <span className="text-xs overflow-hidden text-ellipsis whitespace-nowrap w-56 block text-neutral-400">
          {audioData.metaData.channel}
        </span>
      </div>
      <div className="flex">
        {libraryList.includes(audioData) ? (
          <button
            onClick={() =>
              setLibraryList(libraryList.filter((song) => song !== audioData))
            }
          >
            <HiX className={`text-white opacity-50 hover:opacity-100`} />
          </button>
        ) : (
          <button onClick={() => setLibraryList([...libraryList, audioData])}>
            <HiPlus
              className={`text-white ${
                isHover ? "opacity-50" : "opacity-0"
              } hover:opacity-100`}
            />
          </button>
        )}
      </div>
      <div className="ml-auto text-neutral-400 text-sm">
        <span>{formatSeconds(audioData.metaData.duration)}</span>
      </div>
    </div>
  );
}
