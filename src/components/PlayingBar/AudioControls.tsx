import { useState } from "react";
import CustomRangeBar from "./CustomRangeBar";
import { FiVolumeX, FiVolume1, FiVolume2 } from "react-icons/fi";
//audio controls located right side of bar

export default function AudioControls() {
  const id = "volume";
  const [volume, setVolume] = useState(0.5);

  let icon;
  if (volume === 0) {
    icon = <FiVolumeX size="22" />;
  } else if (volume < 0.5) {
    icon = <FiVolume1 size="22" />;
  } else {
    icon = <FiVolume2 size="22" />;
  }

  return (
    <div className="flex justify-end flex-grow min-w-[200px] w-1/3">
      <div className="flex justify-end items-center w-40">
        <button
          className="cursor-default opacity-50 hover:opacity-100 hover:scale-105"
          onClick={() => {
            setVolume(0);
          }}
        >
          {icon}
        </button>
        <CustomRangeBar id={id} progress={volume} setProgress={setVolume} />
      </div>
    </div>
  );
}
