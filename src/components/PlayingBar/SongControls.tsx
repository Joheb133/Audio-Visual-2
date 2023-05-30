import { useState } from "react";
import CustomRangeBar from "./CustomRangeBar";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { BsFillSkipStartFill, BsFillSkipEndFill } from "react-icons/bs";

//playback/progress song controls

interface SongControlsProp {
  isPlaying: boolean;
  isAudioContext: AudioContext | undefined;
  isSource: AudioBufferSourceNode | undefined;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function SongControls({
  isPlaying,
  isAudioContext,
  isSource,
  setIsPlaying,
  setQueueIndex,
}: SongControlsProp) {
  const id = "playback";
  const [isDragging, setIsDragging] = useState(false);
  const [playback, setPlayback] = useState(0);
  const [isClickedPrev, setIsClickedPrev] = useState(false);
  const [isClickedPlayPause, setIsClickedPlayPause] = useState(false);
  const [isClickedNext, setIsClickedNext] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-w-[300px] max-w-[600px] w-2/5">
      <div className="flex items-center gap-4 mb-2">
        {/* Prev button */}
        <button
          className={`cursor-default opacity-70 ${
            isClickedPrev ? "" : "hover:opacity-100"
          }`}
          onMouseDown={() => setIsClickedPrev(true)}
          onMouseUp={() => {
            setIsClickedPrev(false);
            if (!isAudioContext || !isSource) return;
            setQueueIndex((currentIndex) => currentIndex - 1);
          }}
          onMouseLeave={() => setIsClickedPrev(false)}
        >
          <BsFillSkipStartFill size="24" />
        </button>

        {/* Play/pause button */}
        <button
          className={`cursor-default ${
            isClickedPlayPause ? "" : "hover:scale-105"
          }`}
          onMouseDown={() => setIsClickedPlayPause(true)}
          onMouseUp={() => {
            setIsClickedPlayPause(false);
            if (!isAudioContext || !isSource) return;
            setIsPlaying(!isPlaying);
          }}
          onMouseLeave={() => setIsClickedPlayPause(false)}
        >
          {isPlaying ? <FaPauseCircle size="32" /> : <FaPlayCircle size="32" />}
        </button>

        {/* Next button */}
        <button
          className={`cursor-default opacity-70 ${
            isClickedNext ? "" : "hover:opacity-100"
          }`}
          onMouseDown={() => setIsClickedNext(true)}
          onMouseUp={() => {
            setIsClickedNext(false);
            if (!isAudioContext || !isSource) return;
            setQueueIndex((currentIndex) => currentIndex + 1);
          }}
          onMouseLeave={() => setIsClickedNext(false)}
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
