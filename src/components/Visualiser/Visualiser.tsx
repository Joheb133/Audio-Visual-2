import { useEffect, useRef } from "react";
import { Bar } from "./2D_Visualisations/Bar";

interface VisualiserProp {
  analyser: AnalyserNode | undefined;
}

export default function Visualiser({ analyser }: VisualiserProp) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!analyser || !canvasRef.current) return;

    const vContainer = document.querySelector(
      ".visualiser-container"
    ) as HTMLDivElement;
    const canvas = canvasRef.current;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx || !vContainer) return;

    const bar = new Bar(ctx, analyser);

    //resize canvas
    const canvasResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      bar.update(canvas.width, canvas.height);
    };
    canvasResize();
    window.addEventListener("resize", canvasResize);

    //draw
    const animator = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bar.draw();
      requestAnimationFrame(animator);
    };
    animator();
  }, [analyser]);

  return (
    <div className="visualiser-container bg-neutral-900 relative rounded-md flex-grow ml-2">
      <canvas ref={canvasRef} className="w-full h-full absolute"></canvas>
    </div>
  );
}
