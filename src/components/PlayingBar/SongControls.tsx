import { useState } from "react";
import CustomRangeBar from "./CustomRangeBar";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { BsFillSkipStartFill, BsFillSkipEndFill } from "react-icons/bs";

//playback/progress song controls

interface SongControlsProp {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function SongControls({
  isPlaying,
  setIsPlaying,
  setQueueIndex,
}: SongControlsProp) {
  const id = "playback";
  const [isDragging, setIsDragging] = useState(false);
  const [playback, setPlayback] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-w-[300px] max-w-[600px] w-2/5">
      <div className="flex items-center gap-4 mb-2">
        <button
          className="cursor-default opacity-70 hover:opacity-100"
          onClick={() => {
            setQueueIndex((currentIndex) => currentIndex - 1);
          }}
        >
          <BsFillSkipStartFill size="24" />
        </button>
        <button
          className="cursor-default hover:scale-105"
          onClick={() => {
            setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying ? <FaPauseCircle size="32" /> : <FaPlayCircle size="32" />}
        </button>
        <button
          className="cursor-default opacity-70 hover:opacity-100"
          onClick={() => {
            setQueueIndex((currentIndex) => currentIndex + 1);
          }}
        >
          <BsFillSkipEndFill size="24" />
        </button>
      </div>
      <CustomRangeBar
        id={id}
        progress={playback}
        setProgress={setPlayback}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
      />
    </div>
  );
}
