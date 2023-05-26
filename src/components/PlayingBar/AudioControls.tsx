import { useState } from "react";
import CustomRangeBar from "./CustomRangeBar";
//audio controls located right side of bar

export default function AudioControls() {
  const id = "volume";
  const [volume, setVolume] = useState(0.5);

  return (
    <div className="flex justify-end flex-grow min-w-[200px] w-1/3">
      <div className="flex justify-end items-center w-40">
        <button
          className="rounded-sm"
          onClick={() => {
            setVolume(0);
          }}
        >
          Mute
        </button>
        <CustomRangeBar id={id} progress={volume} setProgress={setVolume} />
      </div>
    </div>
  );
}
