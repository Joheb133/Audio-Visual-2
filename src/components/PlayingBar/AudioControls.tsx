import CustomRangeBar from "./CustomRangeBar";

//audio controls located right side of bar

export default function AudioControls() {
  return (
    <div className="flex justify-end flex-grow">
      <div className="flex justify-end items-center w-40">
        <button className="rounded-sm">Mute</button>
        <CustomRangeBar id="volume" />
      </div>
    </div>
  );
}
