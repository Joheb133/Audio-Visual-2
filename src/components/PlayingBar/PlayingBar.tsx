import SongInfo from "./SongInfo";
import SongControls from "./SongControls";
import AudioControls from "./AudioControls";

import { AudioSettingsProp } from "../../App";

//bottom bar for controls

interface PlayingBarProp {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioSettings: AudioSettingsProp | null;
}

export default function PlayingBar({
  isPlaying,
  setIsPlaying,
  audioSettings,
}: PlayingBarProp) {
  return (
    <div className="flex items-center justify-center fixed bottom-0 w-screen h-20 bg-neutral-900">
      <div className="flex text-white w-full">
        <SongInfo />
        <SongControls isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        <AudioControls volumeControls={audioSettings?.gainNode} />
      </div>
    </div>
  );
}
