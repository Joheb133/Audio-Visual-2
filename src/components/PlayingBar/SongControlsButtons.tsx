import { useState } from "react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { BsFillSkipStartFill, BsFillSkipEndFill } from "react-icons/bs";
import { AudioSettingsProp } from "../../App";

interface SongControlsButtonsProps {
  isPlaying: boolean;
  audioSettings: AudioSettingsProp | null;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  queueIndex: number;
  maxQueueIndex: number;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
  songTime: number;
  initSong: (number: number) => void;
}

export default function SongControlsButtons({
  isPlaying,
  audioSettings,
  setIsPlaying,
  queueIndex,
  maxQueueIndex,
  setQueueIndex,
  songTime,
  initSong,
}: SongControlsButtonsProps) {
  const [isClickedPrev, setIsClickedPrev] = useState(false);
  const [isClickedPlayPause, setIsClickedPlayPause] = useState(false);
  const [isClickedNext, setIsClickedNext] = useState(false);

  return (
    <>
      {/* Prev button */}
      <button
        className={`cursor-default opacity-70 ${
          isClickedPrev ? "" : "hover:opacity-100"
        }`}
        onMouseDown={() => setIsClickedPrev(true)}
        onMouseUp={() => {
          setIsClickedPrev(false);
          if (!audioSettings?.audioCtx || !audioSettings.source) return;
          if (songTime > 3 || queueIndex === 0) {
            initSong(0);
          } else if (queueIndex > 0) {
            setQueueIndex((currentIndex) => currentIndex - 1);
          }
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
          if (!audioSettings?.audioCtx || !audioSettings.source) return;
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
          if (!audioSettings?.audioCtx || !audioSettings.source) return;
          if (queueIndex < maxQueueIndex) {
            setQueueIndex((currentIndex) => currentIndex + 1);
          }
        }}
        onMouseLeave={() => setIsClickedNext(false)}
      >
        <BsFillSkipEndFill size="24" />
      </button>
    </>
  );
}
