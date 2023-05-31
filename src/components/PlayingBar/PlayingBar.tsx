import SongInfo from "./SongInfo";
import SongControls from "./SongControls";
import AudioControls from "./AudioControls";

import { AudioSettingsProp } from "../../App";

//bottom bar for controls

interface PlayingBarProp {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
  audioSettings: AudioSettingsProp | null;
  songDuration: number | undefined;
}

export default function PlayingBar({
  isPlaying,
  setIsPlaying,
  setQueueIndex,
  audioSettings,
  songDuration,
}: PlayingBarProp) {
  return (
    <div className="flex items-center justify-center fixed bottom-0 w-screen h-20 bg-neutral-900">
      <div className="flex text-white w-full">
        <SongInfo />
        <SongControls
          {...{ isPlaying, setIsPlaying }}
          setQueueIndex={setQueueIndex}
          audioSettings={audioSettings}
          songDuration={songDuration}
        />
        <AudioControls volumeControls={audioSettings?.gainNode} />
      </div>
    </div>
  );
}
