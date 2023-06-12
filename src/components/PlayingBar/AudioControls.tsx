import { useEffect, useState } from "react";
import CustomRangeBar from "./CustomRangeBar";
import { FiVolumeX, FiVolume1, FiVolume2 } from "react-icons/fi";
//audio controls located right side of bar

interface AudioControlsProps {
  volumeControls: GainNode | undefined;
}

export default function AudioControls({ volumeControls }: AudioControlsProps) {
  const id = "volume";
  const [volume, setVolume] = useState(() => {
    //check for save volume, default to 0.35
    const storedVolume = localStorage.getItem("volume");
    return storedVolume ? parseFloat(storedVolume) : 0.35;
  });
  const [volumeSave, setVolumeSave] = useState(volume);
  const [isDragging, setIsDragging] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  //set volume icon
  let icon;
  if (volume === 0) {
    icon = <FiVolumeX size="22" />;
  } else if (volume < 0.5) {
    icon = <FiVolume1 size="22" />;
  } else {
    icon = <FiVolume2 size="22" />;
  }

  //set & save volume value before dragging
  //if user drags to 0 unmuting will use save value
  useEffect(() => {
    if (volume !== 0 && !isDragging) {
      setVolumeSave(volume);
      localStorage.setItem("volume", volume.toString());
    }
  }, [isDragging]);

  //change gain
  useEffect(() => {
    if (volumeControls) {
      volumeControls.gain.value = volume;
    }
  }, [volume, volumeControls]);

  return (
    <div className="flex justify-end flex-grow min-w-[200px] w-1/3">
      <div className="flex justify-end items-center w-40">
        <button
          className={`${
            isClicked ? "" : "hover:opacity-100"
          } cursor-default opacity-50`}
          onMouseDown={() => setIsClicked(true)}
          onMouseUp={() => {
            setIsClicked(false);
            volume === 0 ? setVolume(volumeSave) : setVolume(0);
          }}
          onMouseLeave={() => setIsClicked(false)}
        >
          {icon}
        </button>
        <CustomRangeBar
          id={id}
          steps={100}
          progress={volume}
          setProgress={setVolume}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
        />
      </div>
    </div>
  );
}
