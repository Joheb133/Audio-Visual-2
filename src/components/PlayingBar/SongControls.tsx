import { useEffect, useState } from "react";
import CustomRangeBar from "./CustomRangeBar";
import SongControlsButtons from "./SongControlsButtons";
import { AudioSettingsProp } from "../../App";

//playback/progress song controls

interface SongControlsProp {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playback: number;
  setPlayback: React.Dispatch<React.SetStateAction<number>>;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
  songDuration: number;
  songTime: number;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function SongControls({
  isPlaying,
  setIsPlaying,
  playback,
  setPlayback,
  isDragging,
  setIsDragging,
  audioSettings,
  songDuration,
  songTime,
  setQueueIndex,
}: SongControlsProp) {
  const id = "playback";
  const [songTimeEl, setSongTimeEl] = useState<number | undefined>(undefined);

  //update song time element
  useEffect(() => {
    if (songDuration === 0) return;
    setSongTimeEl(playback * songDuration);
  }, [playback]);

  useEffect(() => {
    if (isDragging) return;
    setSongTimeEl(songTime);

    //song time goes from 1 to duration (e.g 180 [seconds])
    //1 / duration is like saying the 1th step of the range bar
    setPlayback(songTime / Math.floor(songDuration));
  }, [songTime]);

  //format seconds to 0:00
  function formatSeconds(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);

    const formatedTime = s < 10 ? `${mins}:0${s}` : `${mins}:${s}`;

    return formatedTime;
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-[300px] max-w-[620px] w-2/5">
      <div className="flex items-center gap-4 mb-2">
        <SongControlsButtons
          {...{ isPlaying, setIsPlaying }}
          isAudioContext={audioSettings?.audioCtx}
          isSource={audioSettings?.source}
          setQueueIndex={setQueueIndex}
        />
      </div>
      <div className="flex w-full text-xs whitespace-nowrap">
        <span>
          {songTimeEl !== undefined ? formatSeconds(songTimeEl) : "-:--"}
        </span>
        <CustomRangeBar
          id={id}
          steps={songDuration !== undefined ? Math.floor(songDuration) : 0}
          progress={playback}
          setProgress={setPlayback}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
        />
        <span>{songDuration !== 0 ? formatSeconds(songDuration) : "-:--"}</span>
      </div>
    </div>
  );
}
