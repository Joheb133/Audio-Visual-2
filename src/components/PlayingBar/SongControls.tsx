import { useState } from "react";
import CustomRangeBar from "./CustomRangeBar";
import SongControlsButtons from "./SongControlsButtons";
import { AudioSettingsProp } from "../../App";

//playback/progress song controls

interface SongControlsProp {
  isPlaying: boolean;
  audioSettings: AudioSettingsProp | null;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function SongControls({
  isPlaying,
  audioSettings,
  setIsPlaying,
  setQueueIndex,
}: SongControlsProp) {
  const id = "playback";
  const [isDragging, setIsDragging] = useState(false);
  const [playback, setPlayback] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-w-[300px] max-w-[600px] w-2/5">
      <div className="flex items-center gap-4 mb-2">
        <SongControlsButtons
          {...{ isPlaying, setIsPlaying }}
          isAudioContext={audioSettings?.audioCtx}
          isSource={audioSettings?.source}
          setQueueIndex={setQueueIndex}
        />
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
