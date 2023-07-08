import { useEffect, useRef, useState } from "react";
import CustomRangeBar from "./CustomRangeBar";
import SongControlsButtons from "./SongControlsButtons";
import { AudioSettingsProp } from "../../App";
import formatSeconds from "../../helpers/formatSeconds";

//playback/progress song controls

interface SongControlsProp {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
  songDuration: number;
  songTime: number;
  queueIndex: number;
  maxQueueIndex: number;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
  initSong: (number: number) => void;
}

export default function SongControls({
  isPlaying,
  setIsPlaying,
  audioSettings,
  songDuration,
  songTime,
  queueIndex,
  maxQueueIndex,
  setQueueIndex,
  initSong,
}: SongControlsProp) {
  const [isSeeking, setIsSeeking] = useState(false);
  const [playback, setPlayback] = useState(0);
  const songTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

  //update song time element
  useEffect(() => {
    if (songDuration === 0) return;
    songTimeRef.current = playback * songDuration;
  }, [playback]);

  useEffect(() => {
    if (isSeeking) return;
    songTimeRef.current = songTime;

    //song time goes from 1 to duration (e.g 180 [seconds])
    //1 / duration is like saying the 1th step of the range bar
    setPlayback(songTime / Math.floor(songDuration));
  }, [songTime]);

  //handle seeking
  useEffect(() => {
    if (isSeeking) {
      isSeekingRef.current = true;
    }

    if (!isSeeking && isSeekingRef.current) {
      const currentSeekTime = Math.floor(playback * songDuration);
      initSong(currentSeekTime);

      isSeekingRef.current = false;
    }
  }, [isSeeking]);

  return (
    <div className="flex flex-col items-center justify-center min-w-[300px] max-w-[620px] w-2/5">
      <div className="flex items-center gap-4 mb-2">
        <SongControlsButtons
          {...{ isPlaying, setIsPlaying }}
          audioSettings={audioSettings}
          queueIndex={queueIndex}
          maxQueueIndex={maxQueueIndex}
          setQueueIndex={setQueueIndex}
          songTime={songTime}
          initSong={initSong}
        />
      </div>
      <div className="flex w-full text-xs whitespace-nowrap">
        <span>
          {songTimeRef.current !== undefined
            ? formatSeconds(songTimeRef.current)
            : "-:--"}
        </span>
        <CustomRangeBar
          steps={songDuration !== undefined ? Math.floor(songDuration) : 0}
          progress={playback}
          setProgress={setPlayback}
          isDragging={isSeeking}
          setIsDragging={setIsSeeking}
        />
        <span>{songDuration !== 0 ? formatSeconds(songDuration) : "-:--"}</span>
      </div>
    </div>
  );
}
