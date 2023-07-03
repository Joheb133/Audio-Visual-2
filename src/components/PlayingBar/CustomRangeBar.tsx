import { useEffect, useRef } from "react";
import { round } from "../../helpers/round";

//blueprint for playback and audio control

interface CustomRangeBarProps {
  steps: number;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CustomRangeBar({
  steps,
  progress,
  setProgress,
  isDragging,
  setIsDragging,
}: CustomRangeBarProps) {
  const containerRefs = useRef<HTMLDivElement>(null);
  //handle moving bar
  const handleBarUpdate = (e: MouseEvent, container: HTMLDivElement) => {
    e.preventDefault();
    if ((e.buttons & 1) !== 1) return; //if not left mouse
    const rect = container.getBoundingClientRect();
    setProgress(
      round(
        Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width,
        Math.log10(steps)
      )
    );
  };

  //listen for dragging bar
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const container = containerRefs.current as HTMLDivElement;
      handleBarUpdate(e, container);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <>
      <div
        ref={containerRefs}
        className={`relative w-full h-4 mx-2 group`}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleBarUpdate(e.nativeEvent, e.currentTarget as HTMLDivElement);
        }}
      >
        {/* Grey & purple bar */}
        <div className="absolute top-[50%] translate-y-[-50%] bg-neutral-400 rounded-md h-1 w-full overflow-hidden">
          <div
            className="bg-purple-600 h-1 rounded-md"
            style={{ transform: `translateX(${(-1 + progress) * 100}%)` }}
          />
        </div>
        {/* Circle */}
        <div
          className={`thumb-indicator absolute top-[50%] left-0 bg-purple-900 rounded-full w-2 h-2 scale-0 translate-x-[-50%]
        translate-y-[-50%] group-hover:scale-150 ${
          isDragging ? "scale-150" : ""
        }`}
          style={{ left: `${progress * 100}%` }}
        />
      </div>
    </>
  );
}
