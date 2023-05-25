import SongInfo from "./SongInfo";
import SongControls from "./SongControls";
import AudioControls from "./AudioControls";

//bottom bar for controls

export default function PlayingBar() {
  return (
    <div className="fixed bottom-0 w-screen h-fit bg-neutral-900">
      <div className="flex m-2 text-white items-center">
        <SongInfo />
        <SongControls />
        <AudioControls />
      </div>
    </div>
  );
}
