import { useEffect, useRef, useState } from "react";
import { Bar, Circle } from "./2D_Visualisations";

interface VisualiserProp {
  analyser: AnalyserNode | undefined;
}

export default function Visualiser({ analyser }: VisualiserProp) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visual, setVisual] = useState(1);
  const visualDictionary: { [key: number]: typeof Bar | typeof Circle } = {
    1: Bar,
    2: Circle,
  };

  useEffect(() => {
    if (!analyser || !canvasRef.current) return;

    const vContainer = document.querySelector(
      ".visualiser-container"
    ) as HTMLDivElement;
    const canvas = canvasRef.current;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx || !vContainer) return;

    const visualisation = new visualDictionary[visual](ctx, analyser);

    //resize canvas
    const canvasResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      visualisation.update(canvas.width, canvas.height);
    };
    canvasResize();
    window.addEventListener("resize", canvasResize);

    //draw
    let animationFrameId: number;

    const animator = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      visualisation.draw();
      animationFrameId = requestAnimationFrame(animator);
    };
    animator();

    return () => {
      window.removeEventListener("resize", canvasResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [analyser, visual]);

  return (
    <div className="visualiser-container bg-neutral-900 relative rounded-md flex-grow ml-2">
      <canvas ref={canvasRef} className="w-full h-full absolute"></canvas>
      <div className="visual-selector-wrap w-full h-28 box-border flex absolute bottom-0 gap-4 items-center justify-center">
        <div
          className="w-32 h-16 bg-white rounded-lg left-1/2 hover:cursor-pointer"
          onClick={() => {
            setVisual(1);
          }}
        >
          Bar
        </div>
        <div
          className="w-32 h-16 bg-white rounded-lg left-1/2 hover:cursor-pointer"
          onClick={() => {
            setVisual(2);
          }}
        >
          Circle
        </div>
      </div>
    </div>
  );
}
