import { useState } from "react";
import CustomRangeBar from "./CustomRangeBar";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { BsFillSkipStartFill, BsFillSkipEndFill } from "react-icons/bs";

//playback/progress song controls

export default function SongControls() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-w-[300px] max-w-[600px] w-2/5">
      <div className="flex items-center gap-4">
        <button className="cursor-default opacity-70 hover:opacity-100">
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
        <button className="cursor-default opacity-70 hover:opacity-100">
          <BsFillSkipEndFill size="24" />
        </button>
      </div>
      <CustomRangeBar id="playback" />
    </div>
  );
}
