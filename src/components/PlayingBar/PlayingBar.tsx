import SongInfo from "./SongInfo";
import SongControls from "./SongControls";
import AudioControls from "./AudioControls";

//bottom bar for controls

export default function PlayingBar() {
  return (
    <div className="flex items-center justify-center fixed bottom-0 w-screen h-20 bg-neutral-900">
      <div className="flex text-white w-full">
        <SongInfo />
        <SongControls />
        <AudioControls />
      </div>
    </div>
  );
}
