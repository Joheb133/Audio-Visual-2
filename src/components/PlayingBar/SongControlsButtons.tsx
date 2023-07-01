import { useRef } from "react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { BsFillSkipStartFill, BsFillSkipEndFill } from "react-icons/bs";

interface SongControlsButtonsProps {
  isPlaying: boolean;
  isAudioContext: AudioContext | undefined;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
  songTime: number;
  initSong: (number: number) => void;
}

export default function SongControlsButtons({
  isPlaying,
  isAudioContext,
  setIsPlaying,
  setQueueIndex,
  songTime,
  initSong,
}: SongControlsButtonsProps) {
  const isClickedPrev = useRef(false);
  const isClickedPlayPause = useRef(false);
  const isClickedNext = useRef(false);

  return (
    <>
      {/* Prev button */}
      <button
        className={`cursor-default opacity-70 ${
          isClickedPrev.current ? "" : "hover:opacity-100"
        }`}
        onMouseDown={() => (isClickedPrev.current = true)}
        onMouseUp={() => {
          isClickedPrev.current = false;
          if (!isAudioContext) return;
          if (songTime > 3) {
            initSong(0);
          } else {
            setQueueIndex((currentIndex) => currentIndex - 1);
          }
        }}
        onMouseLeave={() => (isClickedPrev.current = false)}
      >
        <BsFillSkipStartFill size="24" />
      </button>

      {/* Play/pause button */}
      <button
        className={`cursor-default ${
          isClickedPlayPause.current ? "" : "hover:scale-105"
        }`}
        onMouseDown={() => (isClickedPlayPause.current = true)}
        onMouseUp={() => {
          isClickedPlayPause.current = false;
          if (!isAudioContext) return;
          setIsPlaying(!isPlaying);
        }}
        onMouseLeave={() => (isClickedPlayPause.current = false)}
      >
        {isPlaying ? <FaPauseCircle size="32" /> : <FaPlayCircle size="32" />}
      </button>

      {/* Next button */}
      <button
        className={`cursor-default opacity-70 ${
          isClickedNext.current ? "" : "hover:opacity-100"
        }`}
        onMouseDown={() => (isClickedNext.current = true)}
        onMouseUp={() => {
          isClickedNext.current = false;
          if (!isAudioContext) return;
          setQueueIndex((currentIndex) => currentIndex + 1);
        }}
        onMouseLeave={() => (isClickedNext.current = false)}
      >
        <BsFillSkipEndFill size="24" />
      </button>
    </>
  );
}
