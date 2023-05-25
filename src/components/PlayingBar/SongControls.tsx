import CustomRangeBar from "./CustomRangeBar";

//playback/progress song controls

export default function SongControls() {
  return (
    <div className="flex flex-col items-center justify-center w-[400px]">
      <div>
        <button className="rounded-sm">Prev</button>
        <button className="rounded-sm font-semibold">Play</button>
        <button className="rounded-sm">Next</button>
      </div>
      <CustomRangeBar id="playback" />
    </div>
  );
}
